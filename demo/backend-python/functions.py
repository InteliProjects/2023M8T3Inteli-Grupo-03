import pandas as pd
import numpy as np
import sklearn
from sklearn import preprocessing
from sklearn.preprocessing import OneHotEncoder
from imblearn.over_sampling import SMOTE
from sklearn.model_selection import train_test_split # separa o dataset de teste
from sklearn.neighbors import KNeighborsClassifier
from sklearn import metrics
from sklearn.metrics import accuracy_score, f1_score
from sklearn.metrics import classification_report
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay # matriz de confusão
import matplotlib.pyplot as plt
import pickle

import json
import requests

def drop_columns(dados):
    result = dados.drop(['Invoice ID', 'Invoice Number', 'Supplier Name', 'Requestor Name', 'Preparer Name', 'PO Number', 'Region',
                          'Level 3', 'Month, Day, Year of Payment Date', 'Parent Supplier Name', 'Strategic Region', 'Cost Center',
                            'Cost Center (Level 6)', 'GL Desc (Level 5)', 'GL Desc (Level 6)', 'Amout USD', 'Country Name', 'Cost Center (Base Level)', 'Cost Center (Level 4)', 'GL Desc (Level 4)', 'GL Description'], axis=1)
    return result

def onehot(dados):
    # Inicializar o OneHotEncoder
    encoder = OneHotEncoder(sparse=False)
    # Aplicar one-hot encoding a todas as colunas categóricas
    result = pd.get_dummies(dados)

    return result

def label(dados):
    # Inicializar o LabelEncoder
    label_encoder = LabelEncoder()
    # Aplicar o Label Encoding à coluna 'Level 2'
    result = label_encoder.fit_transform(dados)
    
    return result

# def create_df():
#     dataframe = pd.read_csv("./data/completeNORAM.csv")
#     # dataframe = pd.read_csv("./data/amostraNORAM.csv")

#     # print(dataframe.head(1))
#     return dataframe

# # criar dataframe de teinamento
# dfPreTreino = create_df()

# def treat_df(dataframe):
#     dataframe = drop_columns(dataframe)
#     data_sem_level2 = dataframe.drop('Level 2', axis=1)
#     df_encoded = onehot(data_sem_level2)
#     dado_level2 = pd.DataFrame(dataframe, columns=['Level 2'])
#     df_encoded = pd.concat([df_encoded, dado_level2], axis = 1)
#     return df_encoded

# dfTreino = treat_df(dfPreTreino)

# complete = pd.read_csv("./data/completeNORAM.csv")
# dfTeste = treat_df(complete)

# treinamento do modelo
# def treinamentoModelo(df_props):
#     x = df_props.drop(['Level 2'], axis = 1) #features
#     y = df_props['Level 2'] #alvo

#     x_train, x_test, y_train, y_test = train_test_split(x,
#                                                     y,
#                                                     test_size=0.7,
#                                                     random_state=32)
    
#     # #calculo para ajudar a definir o k
#     # import math
#     # print ( 'math:' , math.sqrt(len(y_test)))

#     #modelo
#     print(df_props)
#     neigh = KNeighborsClassifier(n_neighbors=24, metric='euclidean')
#     neigh.fit(x_train, y_train.squeeze())
    
#     # print('Acuracia (treino): ', neigh.score( x_train, y_train ))
#     # print('Acuracia (teste): ', neigh.score( x_test, y_test ))
#     # Salvar o modelo em um arquivo pickle
#     with open('modelo.pkl', 'wb') as file:
#         pickle.dump(neigh, file)


#     return neigh


# treinar modelo
# neigh = treinamentoModelo(dfTreino)

dfTreinoNovo = pd.read_csv('./data/dfColunas')
# PIPELINES
def pipelineTratamento(dado):
    # dado = pd.read_csv(dado)
    # dado = pd.concat([dfPreTreino, dado], ignore_index=True) #essa etapa é necessaria para que as colunas criadas pelo one hot encoding sejam as mesmas
    # dado = drop_columns(dado)
    # dado_x = dado.drop('Level 2', axis=1) para teste
    dado_x = dado
    dado_x = onehot(dado_x)
    dado_x = pd.concat([dfTreinoNovo, dado_x], ignore_index=True) #essa etapa é necessaria para que as colunas criadas pelo one hot encoding sejam as mesmas
    
    # dado_y = pd.DataFrame(dado, columns=['Level 2'])
    # dado = pd.concat([dado_x, dado_y], axis = 1)
    dado = dado_x
    dado = dado.tail(1)
    dado = dado.fillna(0)
    # print("oii", dado)
    print( "tratamento feito")
    return dado

# Carregar o modelo salvo
with open('modelo.pkl', 'rb') as file:
    model = pickle.load(file)

def pipelineClassificacao(NormalizedSupplierName, Level1, BusinessUnit, LegalEntity, InvoiceSource, Product, Project):
    print("0")
    # Criando DataFrame com as informações recebidas
    dados = {
        "Normalized Supplier Name": [NormalizedSupplierName],
        "Level 1": [Level1],
        # "Level 2": [Level2],
        "Business Unit": [BusinessUnit],
        "Legal Entity": [LegalEntity],
        "Invoice Source": [InvoiceSource],
        "Product": [Product],
        "Project": [Project],
    }

    dado = pd.DataFrame(dados)

    # print(dado)
    print("1")
    # tratamento
    dado = pipelineTratamento(dado)
    print("2")
    # modelo
    x_test_2 = dado #features
    # y_test_2 = dado['Level 2'] #alvo 
    print(dado.columns)
    print("3")
    y_pred_2 = model.predict(x_test_2)
    print("4")
    print(y_pred_2)
    # print('Acuracia (entre os 10 testes isolados): ', model.score( x_test_2, y_test_2 ))

    resultado = y_pred_2

    # Convert the NumPy array to a Python list
    resultado = resultado.tolist()

    classe_dict ={"classe": resultado }
    
    json_data = json.dumps(classe_dict)
    
    # requests.post("http://localhost:5000/process", {"data": json_data, 
    #                                                         #  "SupplierName" : SupplierName, 
    #                                                          "NormalizedSupplierName" : NormalizedSupplierName, 
    #                                                          "Level1": Level1, 
    #                                                         #  "Level2": Level2, 
    #                                                          "BusinessUnit": BusinessUnit, 
    #                                                          "LegalEntity": LegalEntity,
    #                                                          "InvoiceSource": InvoiceSource, 
    #                                                          "Product": Product, 
    #                                                          "Project": Project
    #                                                          })

    
    print("item classificado com sucesso")
    return json_data

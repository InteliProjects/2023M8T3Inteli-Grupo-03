import java.util.Random;

public class Disponibilidade {
    private int qntReqsParaFalhar = 0;
    private int users = 0;
    private long tempoDisponivel = 0;
    private long tempoIndisponivel = 0;
    private int qntFalhas = 0;

    public Disponibilidade(int qntReqsParaFalhar) {
        this.qntReqsParaFalhar = qntReqsParaFalhar;
    }

    public void execSimulacaoDisponibilidade(){

        long inicioSimulacao = System.currentTimeMillis();
        Random random = new Random();
        int dado;

        while(this.users != this.qntReqsParaFalhar){
            System.out.println("Usuário: " + this.users);
            System.out.println("Serviço disponivel para uso");
            this.users += 1;
        }

        System.out.println("Serviço indiponivel");



        int a = 0;

        while(a != 10){
            while(true){
                dado = random.nextInt(20);
                if (dado == 1 || dado == 2) {
                    System.out.println("Serviço disponível novamente !");
                    this.tempoDisponivel += System.currentTimeMillis() - inicioSimulacao;
                    break;
                }else{
                    System.out.println("Serviço indisponível");
                    this.tempoIndisponivel += System.currentTimeMillis() - inicioSimulacao;
                    this.qntFalhas += 1;
                }
            }

            a += 1;
        }

        int tempoMedioEntreAsFalhas = (int) (this.tempoDisponivel / 1000);
        int tempoDeParada = (int) (this.tempoIndisponivel / 1000);
        int mtbf = tempoMedioEntreAsFalhas / this.qntFalhas;
        int mttr = tempoDeParada / this.qntFalhas;


        System.out.println("MTBF: " + mtbf + " Segundos");
        System.out.println("MTTR: " + mttr + " Segundos");


    }
}

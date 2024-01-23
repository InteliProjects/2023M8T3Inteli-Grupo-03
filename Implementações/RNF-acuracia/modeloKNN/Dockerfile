FROM python:3.9-slim

WORKDIR /src

COPY requirements.txt .

RUN pip install -r requirements.txt

RUN pip install flask[async]

COPY . .

EXPOSE 5000

CMD ["python3", "api_modelo.py"]

# docker run -d -p 5000:5000 api-modelo
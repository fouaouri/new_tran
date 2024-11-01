FROM python:latest

RUN apt update -y ; apt upgrade -y ; pip install django; pip install --upgrade pip \
;pip install django-allauth requests dj-rest-auth djangorestframework-simplejwt django-cors-headers pyotp qrcode[pil]\
; apt-get update && apt-get install -y postgresql-client 

WORKDIR /app

COPY requirements.txt /app
# COPY manage.py .
# RUN python manage.py migrate

RUN pip install --no-cache-dir -r requirements.txt

# CMD ["tail", "-f"]
# CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000"]
CMD ["bash", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]


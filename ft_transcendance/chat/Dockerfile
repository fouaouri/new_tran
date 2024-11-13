# Use a specific version of Python
FROM python:3.10

# Set environment variables for non-interactive installations
ENV DEBIAN_FRONTEND=noninteractive

# Update the package list and install system dependencies
RUN apt update -y && apt upgrade -y \
    && apt-get install -y postgresql-client \
    && pip install --upgrade pip \
    && pip install django daphne redis \
    && pip install django-cors-headers \
    && pip install django-allauth requests dj-rest-auth djangorestframework-simplejwt django-cors-headers channels

# Set the working directory inside the container
WORKDIR /chatco

# Copy the requirements file to the container
COPY requirements.txt /chatco/

# Install dependencies from requirements.txt
RUN pip install --no-cache-dir -r /chatco/requirements.txt

# Install additional Python packages if not in requirements.txt
RUN pip install redis channels channels_redis django-allauth requests dj-rest-auth djangorestframework-simplejwt django-cors-headers

# Set the working directory inside the container
WORKDIR /chatco

# Copy the remaining contents of the chatco directory to /chatco in the container
COPY . /chatco/

# Run migrations and start the server
CMD ["bash", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8001"]

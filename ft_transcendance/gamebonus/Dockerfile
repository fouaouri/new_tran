# Use a specific version of Python
FROM python:3.10

# Set environment variables for non-interactive installations
ENV DEBIAN_FRONTEND=noninteractive

# Update the package list and install system dependencies
RUN apt update -y && apt upgrade -y \
    && apt-get install -y postgresql-client \
    && pip install --upgrade pip \
    && pip install django daphne redis \
    && pip install django-allauth requests dj-rest-auth djangorestframework-simplejwt django-cors-headers channels

# Set the working directory inside the container
WORKDIR /gamebonus3d

# Copy the requirements file to the container
# COPY requirements.txt /gamebonus3d/

# # Install dependencies from requirements.txt
# RUN pip install --no-cache-dir -r /gamebonus3d/requirements.txt

# Install additional Python packages if not in requirements.txt
RUN pip install redis channels channels_redis django-allauth requests dj-rest-auth djangorestframework-simplejwt django-cors-headers

# Set the working directory inside the container
WORKDIR /gamebonus3d

# Copy the remaining contents of the gamebonus3d directory to /gamebonus3d in the container
COPY . /gamebonus3d/

# Run migrations and start the server
CMD ["bash", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8003"]
from django.db import models

class User(models.Model):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    image_link = models.URLField(blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    full_name = models.CharField(max_length=150, blank=True, null=True)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.username

    @property
    def is_anonymous(self):
        return False  # Example: assuming user is always authenticated if the object exists

    @property
    def is_authenticated(self):
        return True  # This is a simplified version; you could add logic here if needed

# class User(models.Model):
#     username = models.CharField(max_length=150, unique=True)
#     email = models.EmailField(unique=True)
#     image_link = models.URLField(blank=True, null=True)
#     city = models.CharField(max_length=100, blank=True, null=True)
#     full_name = models.CharField(max_length=150, blank=True, null=True)

#     # Specify the field used for authentication
#     USERNAME_FIELD = 'username'

#     # Specify which fields are required when creating a user
#     REQUIRED_FIELDS = ['email']

#     def __str__(self):
#         return self.username




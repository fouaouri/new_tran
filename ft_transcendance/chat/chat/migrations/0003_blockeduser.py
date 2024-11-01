# Generated by Django 5.0.6 on 2024-10-06 14:16

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0002_alter_message_id_alter_room_id'),
    ]

    operations = [
        migrations.CreateModel(
            name='BlockedUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('blocker', models.CharField(max_length=100)),
                ('blocked', models.CharField(max_length=100)),
                ('date_blocked', models.DateTimeField(blank=True, default=datetime.datetime.now)),
            ],
        ),
    ]
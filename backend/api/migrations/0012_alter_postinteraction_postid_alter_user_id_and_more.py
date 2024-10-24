# Generated by Django 5.1.1 on 2024-10-24 18:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_alter_postinteraction_postid_alter_user_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='postinteraction',
            name='postID',
            field=models.IntegerField(default=3779110669, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='id',
            field=models.IntegerField(default=8820731614, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='screenName',
            field=models.CharField(default=754595, max_length=20, unique=True),
        ),
    ]

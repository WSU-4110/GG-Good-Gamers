# Generated by Django 5.1.1 on 2024-11-14 05:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_alter_post_postid_alter_user_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='postID',
            field=models.IntegerField(default=1105457735, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='id',
            field=models.IntegerField(default=2918715464, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='screenName',
            field=models.CharField(default=5339589, max_length=20, unique=True),
        ),
    ]
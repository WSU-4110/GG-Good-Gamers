# Generated by Django 5.1.1 on 2024-10-24 19:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_user_docacct_user_isadmin_user_isbanned_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='postID',
            field=models.IntegerField(default=1568422568, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='id',
            field=models.IntegerField(default=9844837636, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='screenName',
            field=models.CharField(default=5738635, max_length=20, unique=True),
        ),
    ]

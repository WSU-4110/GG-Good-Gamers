# Generated by Django 5.1.1 on 2024-10-24 19:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_alter_post_postid_alter_user_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='postID',
            field=models.IntegerField(default=7390556953, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='id',
            field=models.IntegerField(default=4778619187, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='screenName',
            field=models.CharField(default=5380606, max_length=20, unique=True),
        ),
    ]

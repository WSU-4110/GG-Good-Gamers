# Generated by Django 5.1.1 on 2024-10-24 18:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0015_alter_post_postid_alter_user_screenname'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='postID',
            field=models.IntegerField(default=3781231848, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='screenName',
            field=models.CharField(default=9920419, max_length=20, unique=True),
        ),
    ]
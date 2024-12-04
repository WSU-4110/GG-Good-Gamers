# Generated by Django 5.1.1 on 2024-11-14 05:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_alter_post_options_alter_user_options_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='post',
            options={'ordering': ['user']},
        ),
        migrations.RemoveField(
            model_name='post',
            name='dislikeCount',
        ),
        migrations.AddField(
            model_name='post',
            name='postContent',
            field=models.CharField(max_length=500, null=True),
        ),
        migrations.AddField(
            model_name='post',
            name='postDescription',
            field=models.CharField(max_length=2000, null=True),
        ),
        migrations.AddField(
            model_name='post',
            name='userName',
            field=models.CharField(max_length=25, null=True),
        ),
        migrations.AlterField(
            model_name='post',
            name='postID',
            field=models.IntegerField(default=1139345108, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='id',
            field=models.IntegerField(default=4671312457, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='screenName',
            field=models.CharField(default=5815585, max_length=20, unique=True),
        ),
    ]

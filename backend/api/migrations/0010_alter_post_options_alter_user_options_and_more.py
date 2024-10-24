# Generated by Django 5.1.1 on 2024-10-24 19:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_alter_post_postid_alter_user_id_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='post',
            options={'ordering': ['created']},
        ),
        migrations.AlterModelOptions(
            name='user',
            options={'ordering': ['docAcct']},
        ),
        migrations.RemoveField(
            model_name='post',
            name='docPost',
        ),
        migrations.AlterField(
            model_name='post',
            name='postID',
            field=models.IntegerField(default=314359077, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='id',
            field=models.IntegerField(default=2179953204, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='screenName',
            field=models.CharField(default=4952090, max_length=20, unique=True),
        ),
    ]

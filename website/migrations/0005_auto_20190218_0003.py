# Generated by Django 2.1.5 on 2019-02-18 05:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0004_auto_20190216_2215'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='photo',
            name='image',
        ),
        migrations.AddField(
            model_name='photo',
            name='full_image',
            field=models.ImageField(default='placeholder', upload_to='gallery/<django.db.models.fields.CharField>'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='photo',
            name='lazy_image',
            field=models.ImageField(default='placeholder', upload_to='gallery/<django.db.models.fields.CharField>'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='photo',
            name='thumb_image',
            field=models.ImageField(default='placeholder', upload_to='gallery/<django.db.models.fields.CharField>'),
            preserve_default=False,
        ),
    ]

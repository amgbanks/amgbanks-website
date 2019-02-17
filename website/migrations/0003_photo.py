# Generated by Django 2.1.5 on 2019-02-17 00:36

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0002_post_date_created'),
    ]

    operations = [
        migrations.CreateModel(
            name='Photo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('location', models.CharField(blank=True, max_length=255)),
                ('image', models.ImageField(upload_to='media/gallery')),
                ('date_uploaded', models.DateTimeField(default=django.utils.timezone.now)),
                ('display_size', models.CharField(choices=[('small', 'Small'), ('medium', 'Medium'), ('large', 'Large'), ('full', 'Full')], default='medium', max_length=6)),
            ],
        ),
    ]

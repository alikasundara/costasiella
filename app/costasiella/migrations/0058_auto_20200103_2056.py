# Generated by Django 2.2.8 on 2020-01-03 20:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('costasiella', '0057_auto_20200103_1910'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='financeinvoiceitem',
            options={'ordering': ('finance_invoice', 'line_number')},
        ),
    ]

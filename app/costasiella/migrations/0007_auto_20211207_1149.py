# Generated by Django 3.1.13 on 2021-12-07 11:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('costasiella', '0006_auto_20211204_2038'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='account',
            options={'permissions': [('view_automation', 'Can view automation menu'), ('view_insight', 'Can view insight menu'), ('view_insightclasspassesactive', 'Can view insight classpasses active'), ('view_insightclasspassessold', 'Can view insight classpasses sold'), ('view_insightfinancetaxratesummary', 'Can view insight finance tax rates summary'), ('view_insightsubscriptionsactive', 'Can view insight subscriptions active'), ('view_insightsubscriptionssold', 'Can view insight subscriptions sold'), ('view_insightrevenue', 'Can view insight subscriptions sold'), ('view_selfcheckin', 'Can use the selfcheckin feature')]},
        ),
    ]

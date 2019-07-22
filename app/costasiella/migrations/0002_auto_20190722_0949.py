# Generated by Django 2.2.2 on 2019-07-22 09:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('costasiella', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='organizationappointment',
            name='finance_costcenter',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='costasiella.FinanceCostCenter'),
        ),
        migrations.AddField(
            model_name='organizationappointment',
            name='finance_glaccount',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='costasiella.FinanceGLAccount'),
        ),
    ]

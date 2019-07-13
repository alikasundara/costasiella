from django.utils.translation import gettext as _

import graphene
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from graphql import GraphQLError

from ..models import ScheduleItem, OrganizationSubscriptionGroup, ScheduleItemOrganizationSubscriptionGroup
from ..modules.gql_tools import require_login_and_permission, get_rid
from ..modules.messages import Messages

m = Messages()


class ScheduleItemOrganizationSubscriptionGroupNode(DjangoObjectType):
    class Meta:
        model = ScheduleItemOrganizationSubscriptionGroup
        interfaces = (graphene.relay.Node, )

    @classmethod
    def get_node(self, info, id):
        user = info.context.user
        require_login_and_permission(user, 'costasiella.view_scheduleitemorganizationsubscriptiongroup')

        return self._meta.model.objects.get(id=id)


class CreateScheduleItemOrganizationSubscriptionGroup(graphene.relay.ClientIDMutation):
    class Input:
        schedule_item = graphene.ID(required=True)
        organization_subscription_group = graphene.ID(required=True)
        enroll = graphene.Boolean(required=False, default_value=False)
        shop_book = graphene.Boolean(required=False, default_value=False)
        attend = graphene.Boolean(required=False, default_value=False)

    schedule_item_organization_subscription_group = graphene.Field(ScheduleItemOrganizationSubscriptionGroupNode)

    @classmethod
    def mutate_and_get_payload(self, root, info, **input):
        user = info.context.user
        require_login_and_permission(user, 'costasiella.add_scheduleitemorganizationsubscriptiongroup')

        rid_schedule_item = get_rid(input['schedule_item'])
        rid_group = get_rid(input['organization_subscription_group'])

        schedule_item = ScheduleItem.objects.get(pk=rid_schedule_item.id)
        organization_subscription_group = OrganizationSubscriptionGroup.objects.get(pk=rid_group.id)

        schedule_item_organization_subscription_group = ScheduleItemOrganizationSubscriptionGroup(
            schedule_item = schedule_item,
            organization_subscription_group = organization_subscription_group,
        )

        return CreateScheduleItemOrganizationSubscriptionGroup(schedule_item_organization_subscription_group=schedule_item_organization_subscription_group)


class UpdateScheduleItemOrganizationSubscriptionGroup(graphene.relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required=True)
        enroll = graphene.Boolean(required=False, default_value=False)
        shop_book = graphene.Boolean(required=False, default_value=False)
        attend = graphene.Boolean(required=False, default_value=False)

    schedule_item_organization_subscription_group = graphene.Field(ScheduleItemOrganizationSubscriptionGroupNode)

    @classmethod
    def mutate_and_get_payload(self, root, info, **input):
        user = info.context.user
        require_login_and_permission(user, 'costasiella.add_scheduleitemorganizationsubscriptiongroup')

        rid = get_rid(input['id'])
        schedule_item_organization_subscription_group = ScheduleItemOrganizationSubscriptionGroup.objects.filter(id=rid.id).first()
        if not schedule_item_organization_subscription_group:
            raise Exception('Invalid Schedule Item Organization Subscription Group ID!')

        
        if 'enroll' in input:
            schedule_item_organization_subscription_group.enroll = input['enroll']

        if 'shop_book' in input:
            schedule_item_organization_subscription_group.shop_book = input['shop_book']

        if 'attend' in input:
            schedule_item_organization_subscription_group.attend = input['attend']

        return UpdateScheduleItemOrganizationSubscriptionGroup(schedule_item_organization_subscription_group=schedule_item_organization_subscription_group)


class DeleteScheduleItemOrganizationSubscriptionGroup(graphene.relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required=True)

    ok = graphene.Boolean()
    deleted_schedule_item_organization_subcription_group_id = graphene.ID()

    @classmethod
    def mutate_and_get_payload(self, root, info, **input):
        user = info.context.user
        require_login_and_permission(user, 'costasiella.delete_scheduleitemorganizationsubscriptiongroup')

        rid = get_rid(input['id'])
        schedule_item_organization_subscription_group = ScheduleItemOrganizationSubscriptionGroup.objects.filter(id=rid.id).first()
        if not schedule_item_organization_subscription_group:
            raise Exception('Invalid Schedule Item Organization Subscription Group ID!')


        ok = schedule_item_organization_subscription_group.delete()

        return DeleteScheduleItemOrganizationSubscriptionGroup(
            ok=ok
        )


class ScheduleItemOrganizationSubscriptionGroupMutation(graphene.ObjectType):
    create_schedule_item_organization_subcription_group = CreateScheduleItemOrganizationSubscriptionGroup.Field()
    update_schedule_item_organization_subcription_group = UpdateScheduleItemOrganizationSubscriptionGroup.Field()
    delete_schedule_item_organization_subcription_group = DeleteScheduleItemOrganizationSubscriptionGroup.Field()
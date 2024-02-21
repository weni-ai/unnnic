<template>
  <div class="unnnic-form-element">
    <div class="page-title">
      {{ page === 'orgs' ? i18n('your_organizations_label') : i18n('your_projects_label') }}
    </div>

    <h2 class="page-subtitle">
      {{ i18n('choose_one') }}
    </h2>

    <template v-if="page === 'orgs'">
      <unnnic-input
        size="sm"
        icon-left="search-1"
        :placeholder="i18n('search_placeholder')"
        class="search-input"
        v-model="organizationsSearch"
      />

      <div class="organizations-list">
        <unnnic-card-company
          :locale="locale"
          :translations="get(translations, 'plans') ? translations : defaultTranslations"
          v-for="org in orgsFiltered"
          :key="org.uuid"
          :name="org.name"
          :description="org.description"
          :tag="
            org.organization_billing.plan === 'trial'
              ? i18n('organizations_plans_trial')
              : undefined
          "
          :members="parseMembers(org.authorizations.users)"
          :members-description="
            org.authorizations.count > 3
              ? i18n('remaining_members', org.authorizations.count - 3, {
                  n: org.authorizations.count - 3,
                })
              : undefined
          "
          @click.native="selectOrg(org)"
        />

        <div v-if="organizations.status === 'loading'">
          <unnnic-skeleton-loading tag="div" width="100%" height="32px" />
          <unnnic-skeleton-loading tag="div" width="100%" height="19px" />
          <unnnic-skeleton-loading
            tag="div"
            width="100%"
            height="19px"
            :style="{ marginBottom: '1rem' }"
          />

          <div :style="{ display: 'flex' }">
            <unnnic-skeleton-loading
              tag="div"
              width="64px"
              height="24px"
              :style="{ marginRight: '0.5rem' }"
            />
            <unnnic-skeleton-loading tag="div" width="211px" height="24px" />
          </div>
        </div>

        <div
          v-else-if="
            organizationsSearch
            && organizations.status === 'complete'
            && orgsFiltered.length === 0
          "
          class="organizations-list__not-found"
        >
          {{ i18n('no_matches_for_the_search') }}
        </div>
      </div>
    </template>

    <template v-else-if="currentOrgUuid">
      <unnnic-input
        size="sm"
        icon-left="search-1"
        :placeholder="i18n('search_placeholder')"
        class="search-input"
        v-model="projectsSearch"
      />

      <div class="projects-list">
        <unnnic-card-project
          v-for="project in projectsFiltered"
          :key="project.uuid"
          :name="project.name"
          :statuses="[
            {
              title: i18n('project_ai'),
              icon: 'science-fiction-robot-2',
              scheme: 'aux-blue',
              count: project.inteligence_count,
            },
            {
              title: i18n('project_flows'),
              icon: 'hierarchy-3-2',
              scheme: 'aux-purple',
              count: project.flow_count,
            },
            {
              title: i18n('project_contacts'),
              icon: 'single-neutral-actions-1',
              scheme: 'aux-lemon',
              count: project.total_contact_count,
            },
          ]"
          @click.native="selectProject(project)"
        />

        <div v-if="projects[currentOrgUuid].status === 'loading'">
          <unnnic-skeleton-loading :style="{ marginBottom: '16px' }" tag="div" height="50px" />
          <unnnic-skeleton-loading tag="div" width="100%" height="50px" />
        </div>

        <div
          v-else-if="
            projectsSearch
            && projects[currentOrgUuid].status === 'complete'
            && projectsFiltered.length === 0
          "
          class="projects-list__not-found"
        >
          {{ i18n('no_matches_for_the_search') }}
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import axios from 'axios';
import { get } from 'lodash';
import UnnnicI18n from '../../mixins/i18n';
import UnnnicInput from '../Input/Input.vue';
import UnnnicCardCompany from '../Card/CardCompany.vue';
import UnnnicCardProject from '../CardProject/CardProject.vue';
import UnnnicSkeletonLoading from '../SkeletonLoading/SkeletonLoading.vue';

export default {
  mixins: [UnnnicI18n],

  components: {
    UnnnicInput,
    UnnnicCardCompany,
    UnnnicCardProject,
    UnnnicSkeletonLoading,
  },

  props: {
    projectUuid: {
      type: String,
    },

    page: {
      type: String,
    },

    env: {
      type: String,
      default: 'develop',
      validator: (env) => ['develop', 'staging', 'production'].includes(env),
    },

    authorization: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      organizationsSearch: '',
      projectsSearch: '',

      organizations: {
        page: 0,
        data: [],
        status: null,
      },

      projects: {},

      defaultTranslations: {
        your_organizations_label: {
          'pt-br': 'Suas organizações',
          en: 'Your organizations',
          es: 'Sus organizaciones',
        },

        your_projects_label: {
          'pt-br': 'Seus projetos',
          en: 'Your projects',
          es: 'Sus proyectos',
        },

        choose_one: {
          'pt-br': 'Escolha uma para acessar o Weni Chats',
          en: 'Choose one to access Weni Chats',
          es: 'Elija uno para acceder a los Weni Chats',
        },

        search_placeholder: {
          'pt-br': 'Pesquisar',
          en: 'Search',
          es: 'Buscar',
        },

        no_matches_for_the_search: {
          'pt-br': 'Não há correspondências para a pesquisa',
          en: 'There are no matches for the search',
          es: 'No hay resultados para la encuesta',
        },

        organizations_plans_trial: {
          'pt-br': 'Trial',
          en: 'Trial',
          es: 'Prueba',
        },

        remaining_members: {
          'pt-br': '+{n} membro | +{n} membros',
          en: '+{n} member | +{n} members',
          es: '+{n} miembro | +{n} miembros',
        },

        project_ai: {
          'pt-br': 'Inteligências',
          en: 'Intelligences',
          es: 'Inteligencias',
        },

        project_contacts: {
          'pt-br': 'Contatos',
          en: 'Contacts',
          es: 'Contactos',
        },

        project_flows: {
          'pt-br': 'Fluxos',
          en: 'Flows',
          es: 'Flujos',
        },

        plans: {
          trial: {
            'pt-br': 'Teste',
            en: 'Trial',
            es: 'Prueba',
          },

          scale: {
            'pt-br': 'Scale',
            en: 'Scale',
            es: 'Escala',
          },

          advanced: {
            'pt-br': 'Avançado',
            en: 'Advanced',
            es: 'Avanzada',
          },

          enterprise: {
            'pt-br': 'Empresarial',
            en: 'Enterprise',
            es: 'Empresa',
          },
        },
      },
    };
  },

  computed: {
    currentOrgUuid() {
      const {
        groups: { orgUuid },
      } = this.page.match(/^orgs\/(?<orgUuid>.+)\/projects/) || { groups: {} };

      return orgUuid;
    },

    baseURL() {
      return {
        develop: 'https://api.dev.cloud.weni.ai',
        staging: 'https://api.stg.cloud.weni.ai',
        production: 'https://api.weni.ai',
      }[this.env];
    },

    api() {
      return axios.create({
        baseURL: this.baseURL,
        headers: {
          Authorization: this.authorization,
        },
      });
    },

    orgsFiltered() {
      return this.organizations.data
        .filter(({ name }) => name.toLowerCase().includes(this.organizationsSearch.toLowerCase()));
    },

    projectsFiltered() {
      return this.projects[this.currentOrgUuid].data
        .filter(({ name }) => name.toLowerCase().includes(this.projectsSearch.toLowerCase()));
    },
  },

  watch: {
    page: {
      immediate: true,

      handler(page) {
        if (!page) {
          this.$emit('update:page', 'orgs');
          return;
        }

        const {
          groups: { projectUuid },
        } = this.page.match(/^orgs\/.+\/projects\/(?<projectUuid>.+)$/) || { groups: {} };

        this.$emit('update:project-uuid', projectUuid);

        if (page === 'orgs') {
          if (this.organizations.status === null) {
            this.loadNextOrganizations();
          }
        }
      },
    },

    currentOrgUuid: {
      immediate: true,

      handler(orgUuid) {
        if (!orgUuid) {
          return;
        }

        if (!this.projects[orgUuid]) {
          this.$set(this.projects, orgUuid, {
            page: 0,
            data: [],
            status: null,
          });
        }

        if (this.projects[orgUuid].status === null) {
          this.loadNextProjects(orgUuid);
        }
      },
    },
  },

  methods: {
    get,

    selectOrg(org) {
      this.$emit('update:page', `orgs/${org.uuid}/projects`);
    },

    selectProject(project) {
      this.$emit('update:page', `orgs/${this.currentOrgUuid}/projects/${project.uuid}`);
    },

    parseMembers(authorizations) {
      return authorizations.map((member) => ({
        name:
          [member.first_name, member.last_name].filter((name) => name).join(' ') || member.username,
        photo: member.photo_user,
      }));
    },

    async loadNextProjects(orgUuid) {
      const limit = 20;
      const offset = limit * this.projects[orgUuid].page;

      this.projects[orgUuid].status = 'loading';

      const {
        data: { results, next },
      } = await this.api.get('/v1/organization/project/', {
        params: {
          organization: orgUuid,
          offset,
          limit,
        },
      });

      this.projects[orgUuid].page += 1;

      this.projects[orgUuid].status = next === null ? 'complete' : null;

      this.projects[orgUuid].data = [...this.projects[orgUuid].data, ...results];

      if (this.projects[orgUuid].status !== 'complete') {
        this.loadNextProjects(orgUuid);
      }
    },

    async loadNextOrganizations() {
      const limit = 20;
      const offset = limit * this.organizations.page;

      this.organizations.status = 'loading';

      const {
        data: { results, next },
      } = await this.api.get('/v1/organization/org/', { params: { offset, limit } });

      this.organizations.page += 1;

      this.organizations.status = next === null ? 'complete' : null;

      this.organizations.data = [...this.organizations.data, ...results];

      if (this.organizations.status !== 'complete') {
        this.loadNextOrganizations();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

.page-title {
  text-align: center;
  font-family: $unnnic-font-family-primary;
  font-weight: $unnnic-font-weight-bold;
  font-size: $unnnic-font-size-title-sm;
  line-height: $unnnic-font-size-title-sm + $unnnic-line-height-md;
  color: $unnnic-color-neutral-dark;

  margin-bottom: $unnnic-spacing-nano;
}

.page-subtitle {
  margin: 0;

  text-align: center;
  font-family: $unnnic-font-family-secondary;
  font-weight: $unnnic-font-weight-regular;
  font-size: $unnnic-font-size-body-lg;
  line-height: $unnnic-font-size-body-lg + $unnnic-line-height-md;
  color: $unnnic-color-neutral-dark;

  margin-bottom: $unnnic-spacing-md;
}

.search-input {
  margin-bottom: $unnnic-spacing-xs;
}

.organizations-list,
.projects-list {
  display: flex;
  flex-direction: column;
  row-gap: $unnnic-spacing-xs;

  &__not-found {
    font-family: $unnnic-font-family-secondary;
    font-weight: $unnnic-font-weight-regular;
    font-size: $unnnic-font-size-body-md;
    line-height: $unnnic-font-size-body-md + $unnnic-line-height-md;
    color: $unnnic-color-neutral-cloudy;
    padding-inline: $unnnic-spacing-xs;
  }
}
</style>

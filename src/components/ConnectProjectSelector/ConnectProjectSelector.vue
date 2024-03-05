<template>
  <div class="unnnic-form-element">
    <div class="page-title">
      {{ !organizationUuid ? i18n('your_organizations_label') : i18n('your_projects_label') }}
    </div>

    <h2 v-if="$slots.subtitle" class="page-subtitle">
      <slot name="subtitle"></slot>
    </h2>

    <template v-if="!organizationUuid">
      <unnnic-input
        size="sm"
        icon-left="search-1"
        :placeholder="i18n('search_placeholder')"
        class="search-input"
        v-model="organizationsSearch"
      />

      <div class="organizations-list">
        <unnnic-card-company
          oldVersion
          :locale="locale"
          :translations="get(translations, 'plans') ? translations : defaultTranslations"
          v-for="org in orgsFiltered"
          :key="org.uuid"
          :name="org.name"
          :description="org.description"
          :action-text="i18n('enter')"
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

    <template v-else>
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
          :action-text="i18n('enter')"
          @click.native="selectProject(project)"
        />

        <div v-if="projects[organizationUuid].status === 'loading'">
          <unnnic-skeleton-loading :style="{ marginBottom: '16px' }" tag="div" height="50px" />
          <unnnic-skeleton-loading tag="div" width="100%" height="50px" />
        </div>

        <div
          v-else-if="
            projectsSearch
            && projects[organizationUuid].status === 'complete'
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
import { get, pick } from 'lodash';
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
    organizationUuid: {
      type: String,
    },

    organizationsItems: {
      type: Array,
    },

    projectsItems: {
      type: Array,
    },

    projectUuid: {
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

    organizationAttributes: {
      type: Array,
      default() {
        return ['uuid', 'name', 'description', 'organization_billing.plan', 'authorization.uuid', 'authorization.role', 'is_suspended', 'enforce_2fa'];
      },
    },

    projectAttributes: {
      type: Array,
      default() {
        return ['uuid', 'name', 'description', 'authorization.uuid', 'authorization.role', 'authorization.chats_role'];
      },
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
        enter: {
          'pt-br': 'Entrar',
          en: 'Enter',
          es: 'Entra',
        },

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
      return this.projects[this.organizationUuid].data
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

    organizationUuid: {
      immediate: true,

      handler(organizationUuid) {
        this.$emit('update:projectUuid', null);
        this.$emit('update:projectsItems', []);

        if (organizationUuid) {
          if (!this.projects[organizationUuid]) {
            this.$set(this.projects, organizationUuid, {
              page: 0,
              data: [],
              status: null,
            });
          }

          this.updateProjectsItems();

          if (this.projects[organizationUuid].status === null) {
            this.loadNextProjects(organizationUuid);
          }

          return;
        }

        if (this.organizations.status === null) {
          this.loadNextOrganizations();
        }
      },
    },
  },

  methods: {
    get,

    selectOrg(org) {
      this.$emit('update:organizationUuid', org.uuid);
    },

    selectProject(project) {
      this.$emit('update:projectUuid', project.uuid);
    },

    updateProjectsItems() {
      this.$emit('update:projectsItems', this.projects[this.organizationUuid].data.map((i) => pick(i, this.projectAttributes)));
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

      this.updateProjectsItems();

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

      this.$emit('update:organizationsItems', this.organizations.data.map((i) => pick(i, this.organizationAttributes)));

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
}

.page-subtitle {
  margin: 0;

  text-align: center;
  font-family: $unnnic-font-family-secondary;
  font-weight: $unnnic-font-weight-regular;
  font-size: $unnnic-font-size-body-lg;
  line-height: $unnnic-font-size-body-lg + $unnnic-line-height-md;
  color: $unnnic-color-neutral-dark;
  margin-top: $unnnic-spacing-nano;
}

.search-input {
  margin-top: $unnnic-spacing-md;
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

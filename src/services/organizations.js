import client from './config';

const getOrganizations = async (page) => await client.get(`/organizations/?page${page}`);

const getOrganization = async (org) => await client.get(`/orgs/${org}`);

export { getOrganization, getOrganizations };

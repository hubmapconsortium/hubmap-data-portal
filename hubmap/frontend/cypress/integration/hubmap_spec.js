/* eslint no-undef: 0 */
// TODO: Configure eslint to recognize "cy" as a global.
describe('HuBMAP', () => {
  beforeEach(() => {
    cy.server();
    const api = 'http://localhost:8000/api';
    cy.route(`${api}/?format=json`, 'fixture:base.json');
    cy.route(`${api}/colors/?format=json`, 'fixture:colors.json');
    cy.route(`${api}/genes/?format=json`, 'fixture:genes.json');
  });

  it('Has a homepage', () => {
    cy.visit('/');

    // Header:
    cy.contains('Browse');
    cy.contains('Help');
    cy.contains('Login');

    // Charts:
    cy.contains('# of Cells per Tissue, by Center');
    cy.contains('# Images per Tissue, by Center');
    cy.contains('Caltech');
    cy.contains('Abdomen');

    // Table:
    cy.contains('Experiments From HuBMAP Consortium');
    cy.contains('Imaging Mass Spec.');

    cy.contains('Experiments by Center');

    // Footer:
    cy.contains('Supported by the NIH Common Fund');
  });

  it('Has a working browse menu', () => {
    cy.visit('/');

    cy.contains('Browse').click();
    cy.contains('Data Analysis').click();
    cy.location('pathname').should('eq', '/dataanalysis');
    cy.contains('Search by Tissue'); // TODO: more tests

    cy.contains('Browse').click();
    cy.contains('Experiments').click();
    cy.location('pathname').should('eq', '/experiments');
    cy.contains('Experiments'); // TODO: more tests

    cy.contains('Browse').click();
    cy.contains('Pipelines').click();
    cy.location('pathname').should('eq', '/pipelines');
    cy.contains('Pipelines'); // TODO: more tests
  });

  it('Has a working help menu', () => {
    cy.visit('/');
    cy.contains('Help').click();
    cy.contains('Rna seq Pipeline').click();
    cy.location('pathname').should('eq', '/rnaseq');
    // TODO: Empty page

    cy.contains('Help').click();
    cy.contains('ATAC-seq Pipeline').click();
    cy.location('pathname').should('eq', '/atacseq');
    // TODO: Empty page

    cy.contains('Help').click();
    cy.contains('CDNA-seq Pipeline').click();
    cy.location('pathname').should('eq', '/cdnaseq');
    // TODO: Empty page

    cy.contains('Help').click();
    cy.contains('Spatial Transcriptomic Pipeline').click();
    cy.location('pathname').should('eq', '/spatialtranscriptomic');
    // TODO: Empty page

    cy.contains('Help').click();
    cy.contains('Microscopy Pipeline').click();
    cy.location('pathname').should('eq', '/microscopy');
    // TODO: Empty page

    cy.contains('Help').click();
    cy.contains('Seq Fish Imaging Pipeline').click();
    cy.location('pathname').should('eq', '/seqfishimaging');
    // TODO: Empty page

    cy.contains('Help').click();
    cy.contains('Mass Cytometry Pipeline').click();
    cy.location('pathname').should('eq', '/masscytometry');
    // TODO: Empty page

    cy.contains('Help').click();
    cy.contains('Data Download').click();
    cy.location('pathname').should('eq', '/download');
    // TODO: Empty page

    cy.contains('Help').click();
    cy.contains('User FAQs').click();
    cy.location('pathname').should('eq', '/userfaqs');
    // TODO: Empty page
  });
});

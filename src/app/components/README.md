## Application Components

This application comprises two main interfaces;
- a municipal landing page that allows a municipality (Such as Hobbiton) to manage its own capital investment plans and municipal contact information
- a page that allows the governing region (in this case, The Shire) to review and approve plans from all member municipalities, as well as prepare annual expenditure reports on the region's municipal project spending

### Admin Landing Page

There is a [root "Admin Landing Page"](localhost:4200/) that simply provides links to each municipality's landing page and the regional

### Municipal Landing Page

The root component of this page is the MunicipalLandingPageComponent. This loads the target municipality's landing page, displaying the current contact information for the municipality and it's auditor, as well as the list of capital investment projects of the municipality.

From here, the user can edit the contact information or any existing plan, or they can create a new capital investment plan from scratch

### Regional Landing Page

The root component of [this page](localhost:4200/region) is the RegionalLandingPageComponent. This loads the region's landing page, displaying the list of capital investment projects of the municipalities in the region and the list of annual expenditure reports for the region.

From here, the user can review any existing plan or annual expenditure report.

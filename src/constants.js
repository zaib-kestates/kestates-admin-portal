exports.TeamColumns = [
  {
    header: 'Title',
    field: 'title',
  },
  {
    header: 'Email',
    field: 'email',
  },
  {
    header: 'Department',
    field: 'Department.name',
  },
  {
    header: 'Status',
    field: 'status',
  },
];

exports.BlogColumns = [
  {
    header: 'Title',
    field: 'title',
    width: '20%',
  },
  {
    header: 'Caption',
    field: 'caption',
    width: '45%',
  },
  {
    header: 'Category',
    field: 'BlogCategory.name',
    width: '15%',
  },
  {
    header: 'Status',
    field: 'status',
    width: '12%',
  },
];

exports.BlogCategoryColumns = [
  {
    header: 'Name',
    field: 'name',
  },
];

exports.PartnerColumns = [
  {
    header: 'Name',
    field: 'name',
    width: '15%',
  },
  {
    header: 'Url',
    field: 'url',
    width: '35%',
  },
];

exports.DepartmentColumns = [
  {
    header: 'Name',
    field: 'name',
    width: '15%',
  },
  {
    header: 'Sorting Priority',
    field: 'sorting_priority',
    width: '35%',
  },
];

exports.LocationColumns = [
  {
    header: 'Name',
    field: 'name',
    width: '15%',
  },
  {
    header: 'State',
    field: 'State.name',
    width: '35%',
  },
];

exports.LanguageColumns = [
  {
    header: 'Code',
    field: 'code',
    width: '15%',
  },
  {
    header: 'Name',
    field: 'name',
    width: '35%',
  },
];

exports.homeObject = {
  metadata: {
    title: '',
    header: '',
    description: '',
  },
};

exports.teamObject = {
  file: null,
  name: '',
  title: '',
  message: '',
  email: '',
  contact_number: '',
  slug: '',
  DepartmentId: '',
  LanguageIds: [],
};

exports.blogTemplate = {
  title: '',
  caption: '',
  description: '',
  slug: '',
  BlogCategoryId: '',
};

exports.partnerTemplate = {
  file: '',
  name: '',
  url: '',
};

exports.departmentTemplate = {
  name: '',
  sorting_priority: '',
};

exports.locationTemplate = {
  name: '',
  stateId: '',
};

exports.languageTemplate = {
  code: '',
  name: '',
};

exports.aboutUsTemplate = {
  about: '',
  team: '',
  metadata: {
    title: '',
    header: '',
    description: '',
  },
};

exports.propertyTemplate = {
  title: '',
  description: '',
  price: '',
  bed: '',
  path: '',
  size: '',
  permit_no: '',
  qr_code_link: '',
  slug: '',
  status: '',
  reference_number: '',
  metadata_title: '',
  metadata_description: '',
  publish_status: '',
  PropertyTypeId: '',
  LocationId: '',
  TeamId: '',
  Amenities: [],
};

exports.messageTemplate = (
  severity,
  detail,
  closable = false,
  sticky = false
) => {
  return {
    severity,
    detail,
    closable,
    sticky,
  };
};

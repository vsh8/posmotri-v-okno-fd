import cleanOrder from 'stylelint-config-clean-order';

const [groups, options] = cleanOrder.rules['order/properties-order'];
const propertiesOf = (group) =>
  Array.isArray(group) ? group : (group.properties ?? []);

const interaction = groups.find((group) =>
  propertiesOf(group).includes('cursor')
);
const reordered = groups.filter((group) => group !== interaction);

reordered.splice(
  reordered.findIndex((group) =>
    propertiesOf(group).includes('font-size')
  ) + 1,
  0,
  interaction
);

const compactGroups = reordered.map((group) =>
  Array.isArray(group)
    ? group
    : {
        ...group,
        emptyLineBefore: 'never',
      }
);

export default {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-clean-order',
  ],
  rules: {
    'order/properties-order': [compactGroups, options],
    'selector-class-pattern': [
      '^[a-z][a-z0-9]*(-[a-z0-9]+)*(__[a-z0-9]+(-[a-z0-9]+)*)?(_[a-z0-9]+(-[a-z0-9]+)*){0,2}$',
      {
        message:
          'Expected class selector to follow BEM naming ' +
          '(block__element_modifier_value)',
      },
    ],
    'comment-empty-line-before': null,
  },
};

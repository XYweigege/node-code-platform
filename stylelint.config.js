/** @type {import('stylelint').Config} */
export default {
    extends: ['stylelint-config-recommended-vue'],

    rules: {}, // ✅ 必须有（Stylelint 16 要求）

    overrides: [
        {
            files: ['**/*.vue'],
            rules: {
                'unit-allowed-list': ['em', 'rem', '%', 's', 'px', 'vh', 'vw', 'deg', 'ms']
            }
        }
    ]
}

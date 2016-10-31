page = PAGE
page {
	10 = CASE
	10 {
		key {
			field = backend_layout
			ifEmpty.data = levelfield:-2, backend_layout_next_level, slide
		}
		pagets__infographic_template = COA
		pagets__infographic_template {
			10 = FLUIDTEMPLATE
			10 {
				file = EXT:p72_infographic/Resources/Private/Templates/Infographic.html
				partialRootPath = EXT:p72_infographic/Resources/Private/Partials/
				layoutRootPath = EXT:p72_infographic/Resources/Private/Layouts/
				variables {
					content < styles.content.get
				}
			}
		}
	}
	bodyTagCObject = CASE
	bodyTagCObject {
		stdWrap.wrap = <body class="|">
		stdWrap.splitChar = #
		key.data = levelfield:-2, backend_layout_next_level, slide
		key.override.field = backend_layout
		pagets__infographic_template = TEXT
		pagets__infographic_template.value = p72-infographic
	}
}

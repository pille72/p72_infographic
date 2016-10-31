# Template for custom content elements
tt_content {
	infographic_section = FLUIDTEMPLATE
	infographic_section {
		templateName = InfographicSection.html
		templateRootPaths.10 = EXT:p72_infographic/Resources/Private/Templates/ContentElements/
		partialRootPaths.10 = EXT:p72_infographic/Resources/Private/Partials/ContentElements/
		#dataProcessing < tt_content.textmedia.dataProcessing
		#dataProcessing {
		#	300 = DAW\DawBootstrapGeneral\DataProcessing\FlexFormDataProcessor
		#}
	}
}

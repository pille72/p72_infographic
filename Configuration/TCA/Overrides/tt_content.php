<?php
if (!defined('TYPO3_MODE')) {
    die ('Access denied.');
}

$GLOBALS['TCA']['tt_content']['types']['infographic_section'] = $GLOBALS['TCA']['tt_content']['types']['textmedia'];
$GLOBALS['TCA']['tt_content']['ctrl']['typeicon_classes']['infographic_section'] = 'tx-p72-infographic-infographic-section';


$iconRegistry = \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(\TYPO3\CMS\Core\Imaging\IconRegistry::class);
$iconRegistry->registerIcon(
    'tx-p72-infographic-infographic-section',
    \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
    ['source' => 'EXT:p72_infographic/Resources/Public/Images/Backend/InfoSection.svg']
);

/**

$GLOBALS['TCA']['tt_content']['types']['slider_images'] = array(
    'showitem' => '--palette--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:palette.general;general,
     --palette--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:tabs.media, assets,
     --div--;LLL:EXT:p72_infographic/Resources/Private/Language/locallang_db.xlf:tabs.mediaSettings, pi_flexform,
     --div--;LLL:EXT:p72_infographic/Resources/Private/Language/locallang_db.xlf:slider_images_header,header'
);
*/
$GLOBALS['TCA']['tt_content']['columns']['CType']['config']['items'][] = [
    'LLL:EXT:p72_infographic/Resources/Private/Language/locallang.xlf:infographic_section',
    'infographic_section',
    'EXT:p72_infographic/Resources/Public/Images/Backend/InfoSection.svg'
];


$animation_direction = [
    'animation_direction' => [
        'label'	=> 'LLL:EXT:p72_infographic/Resources/Private/Language/locallang_db.xlf:animation_direction',
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                ['down', 'down'],
                ['right', 'right']
            ],
        ],
    ],
];

$section_bg_color = [
    'section_bg_color' => [
        'label'	=> 'LLL:EXT:p72_infographic/Resources/Private/Language/locallang_db.xlf:section_bg_color',
        'config' => [
            'type' => 'select',
            'renderType' => 'selectSingle',
            'items' => [
                ['navy', 'navy'],
                ['blue', 'blue'],
                ['aqua', 'aqua'],
                ['teal', 'teal'],
                ['olive', 'olive'],
                ['green', 'green'],
                ['lime', 'lime'],
                ['yellow', 'yellow'],
                ['orange', 'orange'],
                ['red', 'red'],
                ['fuchsia', 'fuchsia'],
                ['purple', 'purple'],
                ['maroon', 'maroon'],
                ['white', 'white'],
                ['gray', 'gray'],
                ['silver', 'silver'],
                ['black', 'black'],
            ],
        ],
    ],
];

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', $animation_direction, 1);
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addFieldsToPalette('tt_content', 'header', 'animation_direction', 'after:header_position');

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTCAcolumns('tt_content', $section_bg_color, 1);
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addFieldsToPalette('tt_content', 'header', 'section_bg_color', 'after:header_position');


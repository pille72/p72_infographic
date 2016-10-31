<?php
if (!defined('TYPO3_MODE')) {
    die ('Access denied.');
}

$GLOBALS['TCA']['tt_content']['types']['infographic_section'] = $GLOBALS['TCA']['tt_content']['types']['textmedia'];
/**

$GLOBALS['TCA']['tt_content']['types']['slider_images'] = array(
    'showitem' => '--palette--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:palette.general;general,
     --palette--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:tabs.media, assets,
     --div--;LLL:EXT:p72_infographic/Resources/Private/Language/locallang_db.xlf:tabs.mediaSettings, pi_flexform,
     --div--;LLL:EXT:p72_infographic/Resources/Private/Language/locallang_db.xlf:slider_images_header,header'
);
*/
$GLOBALS['TCA']['tt_content']['columns']['CType']['config']['items'][] = array(
    'LLL:EXT:p72_infographic/Resources/Private/Language/locallang.xlf:infographic_section',
    'infographic_section',
    'EXT:p72_infographic/Resources/Public/Images/Backend/InfoSection.svg'
);

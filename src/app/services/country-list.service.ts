import { Injectable } from '@angular/core';
import { Country } from '../models/types/country';

@Injectable({
  providedIn: 'root',
})
export class CountryListService {
  constructor() {}

  countryList: Country[] = [
    // {
    //   Name: 'Select country',
    //   Value: 'select country',
    // },
    {
      Name: 'Netherlands',
      Value: 'netherlands',
    },
    {
      Name: 'United Kingdom',
      Value: 'united kingdom',
    },
    {
      Name: 'Afghanistan',
      Value: 'afghanistan',
    },
    {
      Name: 'Åland Islands',
      Value: 'åland islands',
    },
    {
      Name: 'Albania',
      Value: 'albania',
    },
    {
      Name: 'Algeria',
      Value: 'algeria',
    },
    {
      Name: 'American Samoa',
      Value: 'american samoa',
    },
    {
      Name: 'Andorra',
      Value: 'andorra',
    },
    {
      Name: 'Angola',
      Value: 'angola',
    },
    {
      Name: 'Anguilla',
      Value: 'anguilla',
    },
    {
      Name: 'Antarctica',
      Value: 'antarctica',
    },
    {
      Name: 'Antigua and Barbuda',
      Value: 'antigua and barbuda',
    },
    {
      Name: 'Argentina',
      Value: 'argentina',
    },
    {
      Name: 'Armenia',
      Value: 'armenia',
    },
    {
      Name: 'Aruba',
      Value: 'aruba',
    },
    {
      Name: 'Australia',
      Value: 'australia',
    },
    {
      Name: 'Austria',
      Value: 'austria',
    },
    {
      Name: 'Azerbaijan',
      Value: 'azerbaijan',
    },
    {
      Name: 'Bahamas',
      Value: 'bahamas',
    },
    {
      Name: 'Bahrain',
      Value: 'bahrain',
    },
    {
      Name: 'Bangladesh',
      Value: 'bangladesh',
    },
    {
      Name: 'Barbados',
      Value: 'barbados',
    },
    {
      Name: 'Belarus',
      Value: 'belarus',
    },
    {
      Name: 'Belgium',
      Value: 'belgium',
    },
    {
      Name: 'Belize',
      Value: 'belize',
    },
    {
      Name: 'Benin',
      Value: 'benin',
    },
    {
      Name: 'Bermuda',
      Value: 'bermuda',
    },
    {
      Name: 'Bhutan',
      Value: 'bhutan',
    },
    {
      Name: 'Bolivia',
      Value: 'bolivia',
    },
    {
      Name: 'Bosnia and Herzegovina',
      Value: 'bosnia and herzegovina',
    },
    {
      Name: 'Botswana',
      Value: 'botswana',
    },
    {
      Name: 'Bouvet Island',
      Value: 'bouvet island',
    },
    {
      Name: 'Brazil',
      Value: 'brazil',
    },
    {
      Name: 'British Indian Ocean Territory',
      Value: 'british indian ocean territory',
    },
    {
      Name: 'Brunei Darussalam',
      Value: 'brunei darussalam',
    },
    {
      Name: 'Bulgaria',
      Value: 'bulgaria',
    },
    {
      Name: 'Burkina Faso',
      Value: 'burkina faso',
    },
    {
      Name: 'Burundi',
      Value: 'burundi',
    },
    {
      Name: 'Cambodia',
      Value: 'cambodia',
    },
    {
      Name: 'Cameroon',
      Value: 'cameroon',
    },
    {
      Name: 'Canada',
      Value: 'canada',
    },
    {
      Name: 'Cape Verde',
      Value: 'cape verde',
    },
    {
      Name: 'Cayman Islands',
      Value: 'cayman islands',
    },
    {
      Name: 'Central African Republic',
      Value: 'central african republic',
    },
    {
      Name: 'Chad',
      Value: 'chad',
    },
    {
      Name: 'Chile',
      Value: 'chile',
    },
    {
      Name: 'China',
      Value: 'china',
    },
    {
      Name: 'Christmas Island',
      Value: 'christmas island',
    },
    {
      Name: 'Cocos (Keeling) Islands',
      Value: 'cocos (keeling) islands',
    },
    {
      Name: 'Colombia',
      Value: 'colombia',
    },
    {
      Name: 'Comoros',
      Value: 'comoros',
    },
    {
      Name: 'Congo',
      Value: 'congo',
    },
    {
      Name: 'Congo, The Democratic Republic of The',
      Value: 'congo, the democratic republic of the',
    },
    {
      Name: 'Cook Islands',
      Value: 'cook islands',
    },
    {
      Name: 'Costa Rica',
      Value: 'costa rica',
    },
    {
      Name: "Cote D'ivoire",
      Value: "cote d'ivoire",
    },
    {
      Name: 'Croatia',
      Value: 'croatia',
    },
    {
      Name: 'Cuba',
      Value: 'cuba',
    },
    {
      Name: 'Cyprus',
      Value: 'cyprus',
    },
    {
      Name: 'Czech Republic',
      Value: 'czech republic',
    },
    {
      Name: 'Denmark',
      Value: 'denmark',
    },
    {
      Name: 'Djibouti',
      Value: 'djibouti',
    },
    {
      Name: 'Dominica',
      Value: 'dominica',
    },
    {
      Name: 'Dominican Republic',
      Value: 'dominican republic',
    },
    {
      Name: 'Ecuador',
      Value: 'ecuador',
    },
    {
      Name: 'Egypt',
      Value: 'egypt',
    },
    {
      Name: 'El Salvador',
      Value: 'el salvador',
    },
    {
      Name: 'Equatorial Guinea',
      Value: 'equatorial guinea',
    },
    {
      Name: 'Eritrea',
      Value: 'eritrea',
    },
    {
      Name: 'Estonia',
      Value: 'estonia',
    },
    {
      Name: 'Ethiopia',
      Value: 'ethiopia',
    },
    {
      Name: 'Falkland Islands (Malvinas)',
      Value: 'falkland islands (malvinas)',
    },
    {
      Name: 'Faroe Islands',
      Value: 'faroe islands',
    },
    {
      Name: 'Fiji',
      Value: 'fiji',
    },
    {
      Name: 'Finland',
      Value: 'finland',
    },
    {
      Name: 'France',
      Value: 'france',
    },
    {
      Name: 'French Guiana',
      Value: 'french guiana',
    },
    {
      Name: 'French Polynesia',
      Value: 'french polynesia',
    },
    {
      Name: 'French Southern Territories',
      Value: 'french southern territories',
    },
    {
      Name: 'Gabon',
      Value: 'gabon',
    },
    {
      Name: 'Gambia',
      Value: 'gambia',
    },
    {
      Name: 'Georgia',
      Value: 'georgia',
    },
    {
      Name: 'Germany',
      Value: 'germany',
    },
    {
      Name: 'Ghana',
      Value: 'ghana',
    },
    {
      Name: 'Gibraltar',
      Value: 'gibraltar',
    },
    {
      Name: 'Greece',
      Value: 'greece',
    },
    {
      Name: 'Greenland',
      Value: 'greenland',
    },
    {
      Name: 'Grenada',
      Value: 'grenada',
    },
    {
      Name: 'Guadeloupe',
      Value: 'guadeloupe',
    },
    {
      Name: 'Guam',
      Value: 'guam',
    },
    {
      Name: 'Guatemala',
      Value: 'guatemala',
    },
    {
      Name: 'Guernsey',
      Value: 'guernsey',
    },
    {
      Name: 'Guinea',
      Value: 'guinea',
    },
    {
      Name: 'Guinea-bissau',
      Value: 'guinea-bissau',
    },
    {
      Name: 'Guyana',
      Value: 'guyana',
    },
    {
      Name: 'Haiti',
      Value: 'haiti',
    },
    {
      Name: 'Heard Island and Mcdonald Islands ',
      Value: 'heard island and mcdonald islands ',
    },
    {
      Name: 'Holy See (Vatican City State)',
      Value: 'holy see (vatican city state)',
    },
    {
      Name: 'Honduras',
      Value: 'honduras',
    },
    {
      Name: 'Hong Kong',
      Value: 'hong kong',
    },
    {
      Name: 'Hungary',
      Value: 'hungary',
    },
    {
      Name: 'Iceland',
      Value: 'iceland',
    },
    {
      Name: 'India',
      Value: 'india',
    },
    {
      Name: 'Indonesia',
      Value: 'indonesia',
    },
    {
      Name: 'Iran, Islamic Republic of',
      Value: 'iran, islamic republic of',
    },
    {
      Name: 'Iraq',
      Value: 'iraq',
    },
    {
      Name: 'Ireland',
      Value: 'ireland',
    },
    {
      Name: 'Isle of Man',
      Value: 'isle of man',
    },
    {
      Name: 'Israel',
      Value: 'israel',
    },
    {
      Name: 'Italy',
      Value: 'italy',
    },
    {
      Name: 'Jamaica',
      Value: 'jamaica',
    },
    {
      Name: 'Japan',
      Value: 'japan',
    },
    {
      Name: 'Jersey',
      Value: 'jersey',
    },
    {
      Name: 'Jordan',
      Value: 'jordan',
    },
    {
      Name: 'Kazakhstan',
      Value: 'kazakhstan',
    },
    {
      Name: 'Kenya',
      Value: 'kenya',
    },
    {
      Name: 'Kiribati',
      Value: 'kiribati',
    },
    {
      Name: "Korea, Democratic People's Republic of",
      Value: "korea, democratic people's republic of",
    },
    {
      Name: 'Korea, Republic of',
      Value: 'korea, republic of',
    },
    {
      Name: 'Kuwait',
      Value: 'kuwait',
    },
    {
      Name: 'Kyrgyzstan',
      Value: 'kyrgyzstan',
    },
    {
      Name: "Lao People's Democratic Republic ",
      Value: "lao people's democratic republic ",
    },
    {
      Name: 'Latvia',
      Value: 'latvia',
    },
    {
      Name: 'Lebanon',
      Value: 'lebanon',
    },
    {
      Name: 'Lesotho',
      Value: 'lesotho',
    },
    {
      Name: 'Liberia',
      Value: 'liberia',
    },
    {
      Name: 'Libyan Arab Jamahiriya',
      Value: 'libyan arab jamahiriya',
    },
    {
      Name: 'Liechtenstein',
      Value: 'liechtenstein',
    },
    {
      Name: 'Lithuania',
      Value: 'lithuania',
    },
    {
      Name: 'Luxembourg',
      Value: 'luxembourg',
    },
    {
      Name: 'Macao',
      Value: 'macao',
    },
    {
      Name: 'Macedonia, The Former Yugoslav Republic of',
      Value: 'macedonia, the former yugoslav republic of',
    },
    {
      Name: 'Madagascar',
      Value: 'madagascar',
    },
    {
      Name: 'Malawi',
      Value: 'malawi',
    },
    {
      Name: 'Malaysia',
      Value: 'malaysia',
    },
    {
      Name: 'Maldives',
      Value: 'maldives',
    },
    {
      Name: 'Mali',
      Value: 'mali',
    },
    {
      Name: 'Malta',
      Value: 'malta',
    },
    {
      Name: 'Marshall Islands',
      Value: 'marshall islands',
    },
    {
      Name: 'Martinique',
      Value: 'martinique',
    },
    {
      Name: 'Mauritania',
      Value: 'mauritania',
    },
    {
      Name: 'Mauritius',
      Value: 'mauritius',
    },
    {
      Name: 'Mayotte',
      Value: 'mayotte',
    },
    {
      Name: 'Mexico',
      Value: 'mexico',
    },
    {
      Name: 'Micronesia, Federated States of',
      Value: 'micronesia, federated states of',
    },
    {
      Name: 'Moldova, Republic of',
      Value: 'moldova, republic of',
    },
    {
      Name: 'Monaco',
      Value: 'monaco',
    },
    {
      Name: 'Mongolia',
      Value: 'mongolia',
    },
    {
      Name: 'Montenegro',
      Value: 'montenegro',
    },
    {
      Name: 'Montserrat',
      Value: 'montserrat',
    },
    {
      Name: 'Morocco',
      Value: 'morocco',
    },
    {
      Name: 'Mozambique',
      Value: 'mozambique',
    },
    {
      Name: 'Myanmar',
      Value: 'myanmar',
    },
    {
      Name: 'Namibia',
      Value: 'namibia',
    },
    {
      Name: 'Nauru',
      Value: 'nauru',
    },
    {
      Name: 'Nepal',
      Value: 'nepal',
    },
    {
      Name: 'Netherlands Antilles',
      Value: 'netherlands antilles',
    },
    {
      Name: 'New Caledonia',
      Value: 'new caledonia',
    },
    {
      Name: 'New Zealand',
      Value: 'new zealand',
    },
    {
      Name: 'Nicaragua',
      Value: 'nicaragua',
    },
    {
      Name: 'Niger',
      Value: 'niger',
    },
    {
      Name: 'Nigeria',
      Value: 'nigeria',
    },
    {
      Name: 'Niue',
      Value: 'niue',
    },
    {
      Name: 'Norfolk Island',
      Value: 'norfolk island',
    },
    {
      Name: 'Northern Mariana Islands',
      Value: 'northern mariana islands',
    },
    {
      Name: 'Norway',
      Value: 'norway',
    },
    {
      Name: 'Oman',
      Value: 'oman',
    },
    {
      Name: 'Pakistan',
      Value: 'pakistan',
    },
    {
      Name: 'Palau',
      Value: 'palau',
    },
    {
      Name: 'Palestinian Territory, Occupied',
      Value: 'palestinian territory, occupied',
    },
    {
      Name: 'Panama',
      Value: 'panama',
    },
    {
      Name: 'Papua New Guinea',
      Value: 'papua new guinea',
    },
    {
      Name: 'Paraguay',
      Value: 'paraguay',
    },
    {
      Name: 'Peru',
      Value: 'peru',
    },
    {
      Name: 'Philippines',
      Value: 'philippines',
    },
    {
      Name: 'Pitcairn',
      Value: 'pitcairn',
    },
    {
      Name: 'Poland',
      Value: 'poland',
    },
    {
      Name: 'Portugal',
      Value: 'portugal',
    },
    {
      Name: 'Puerto Rico',
      Value: 'puerto rico',
    },
    {
      Name: 'Qatar',
      Value: 'qatar',
    },
    {
      Name: 'Reunion',
      Value: 'reunion',
    },
    {
      Name: 'Romania',
      Value: 'romania',
    },
    {
      Name: 'Russian Federation',
      Value: 'russian federation',
    },
    {
      Name: 'Rwanda',
      Value: 'rwanda',
    },
    {
      Name: 'Saint Helena',
      Value: 'saint helena',
    },
    {
      Name: 'Saint Kitts and Nevis',
      Value: 'saint kitts and nevis',
    },
    {
      Name: 'Saint Lucia',
      Value: 'saint lucia',
    },
    {
      Name: 'Saint Pierre and Miquelon',
      Value: 'saint pierre and miquelon',
    },
    {
      Name: 'Saint Vincent and The Grenadines ',
      Value: 'saint vincent and the grenadines ',
    },
    {
      Name: 'Samoa',
      Value: 'samoa',
    },
    {
      Name: 'San Marino',
      Value: 'san marino',
    },
    {
      Name: 'Sao Tome and Principe',
      Value: 'sao tome and principe',
    },
    {
      Name: 'Saudi Arabia',
      Value: 'saudi arabia',
    },
    {
      Name: 'Senegal',
      Value: 'senegal',
    },
    {
      Name: 'Serbia',
      Value: 'serbia',
    },
    {
      Name: 'Seychelles',
      Value: 'seychelles',
    },
    {
      Name: 'Sierra Leone',
      Value: 'sierra leone',
    },
    {
      Name: 'Singapore',
      Value: 'singapore',
    },
    {
      Name: 'Slovakia',
      Value: 'slovakia',
    },
    {
      Name: 'Slovenia',
      Value: 'slovenia',
    },
    {
      Name: 'Solomon Islands',
      Value: 'solomon islands',
    },
    {
      Name: 'Somalia',
      Value: 'somalia',
    },
    {
      Name: 'South Africa',
      Value: 'south africa',
    },
    {
      Name: 'South Georgia and The South Sandwich Islands',
      Value: 'south georgia and the south sandwich islands',
    },
    {
      Name: 'Spain',
      Value: 'spain',
    },
    {
      Name: 'Sri Lanka',
      Value: 'sri lanka',
    },
    {
      Name: 'Sudan',
      Value: 'sudan',
    },
    {
      Name: 'Suriname',
      Value: 'suriname',
    },
    {
      Name: 'Svalbard and Jan Mayen',
      Value: 'svalbard and jan mayen',
    },
    {
      Name: 'Swaziland',
      Value: 'swaziland',
    },
    {
      Name: 'Sweden',
      Value: 'sweden',
    },
    {
      Name: 'Switzerland',
      Value: 'switzerland',
    },
    {
      Name: 'Syrian Arab Republic',
      Value: 'syrian arab republic',
    },
    {
      Name: 'Taiwan',
      Value: 'taiwan',
    },
    {
      Name: 'Tajikistan',
      Value: 'tajikistan',
    },
    {
      Name: 'Tanzania, United Republic of',
      Value: 'tanzania, united republic of',
    },
    {
      Name: 'Thailand',
      Value: 'thailand',
    },
    {
      Name: 'Timor-leste',
      Value: 'timor-leste',
    },
    {
      Name: 'Togo',
      Value: 'togo',
    },
    {
      Name: 'Tokelau',
      Value: 'tokelau',
    },
    {
      Name: 'Tonga',
      Value: 'tonga',
    },
    {
      Name: 'Trinidad and Tobago',
      Value: 'trinidad and tobago',
    },
    {
      Name: 'Tunisia',
      Value: 'tunisia',
    },
    {
      Name: 'Turkey',
      Value: 'turkey',
    },
    {
      Name: 'Turkmenistan',
      Value: 'turkmenistan',
    },
    {
      Name: 'Turks and Caicos Islands',
      Value: 'turks and caicos islands',
    },
    {
      Name: 'Tuvalu',
      Value: 'tuvalu',
    },
    {
      Name: 'Uganda',
      Value: 'uganda',
    },
    {
      Name: 'Ukraine',
      Value: 'ukraine',
    },
    {
      Name: 'United Arab Emirates',
      Value: 'united arab emirates',
    },
    {
      Name: 'United States',
      Value: 'united states',
    },
    {
      Name: 'United States Minor Outlying Islands',
      Value: 'united states minor outlying islands',
    },
    {
      Name: 'Uruguay',
      Value: 'uruguay',
    },
    {
      Name: 'Uzbekistan',
      Value: 'uzbekistan',
    },
    {
      Name: 'Vanuatu',
      Value: 'vanuatu',
    },
    {
      Name: 'Venezuela',
      Value: 'venezuela',
    },
    {
      Name: 'Viet Nam',
      Value: 'viet nam',
    },
    {
      Name: 'Virgin Islands, British',
      Value: 'virgin islands, british',
    },
    {
      Name: 'Virgin Islands, U.S.',
      Value: 'virgin islands, u.s.',
    },
    {
      Name: 'Wallis and Futuna',
      Value: 'wallis and futuna',
    },
    {
      Name: 'Western Sahara',
      Value: 'western sahara',
    },
    {
      Name: 'Yemen',
      Value: 'yemen',
    },
    {
      Name: 'Zambia',
      Value: 'zambia',
    },
    {
      Name: 'Zimbabwe',
      Value: 'zimbabwe',
    },
  ];

  getCountryList() {
    return this.countryList;
  }
}

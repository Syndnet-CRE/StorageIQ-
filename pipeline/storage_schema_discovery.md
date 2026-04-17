# Storage Schema Discovery — ATTOM SYNDNET SHARE
**Generated:** 2026-04-17T01:34:51.944Z
**Database:** ATTOM_SYNDNET_SHARE.DELIVERY
**Filter:** PROPERTYUSESTANDARDIZED = '229' (Self-Storage), TX only (SITUSSTATECOUNTYFIPS LIKE '48%')
**Mode:** READ ONLY

---
## 1. Row Counts (Storage-Filtered, TX Only)

| View | Total Storage Rows (TX) | Distinct ATTOMIDs |
|------|------------------------|-------------------|
| TAX_ASSESSOR | 4,719 | 4,719 |
| RECORDER | 12,030 | 3,499 |
| LOAN_MODEL | 152 | 152 |
| PREFORECLOSURE | 36 | 26 |

## 2. TAX_ASSESSOR — Full Column Inventory

_Schema columns: 321. Population sample: up to 5,000 storage rows (TX)._

| # | Column Name | Data Type | Nullable | % Populated | Comment |
|---|-------------|-----------|----------|-------------|---------|
| 1 | `ATTOMID` | NUMBER | YES | 100.0% | ATTOM Data's Unique parcel identifier. |
| 2 | `SITUSSTATECODE` | TEXT | YES | 100.0% | State where the property is situated. |
| 3 | `SITUSCOUNTY` | TEXT | YES | 100.0% | County where the property is situated. |
| 4 | `PROPERTYJURISDICTIONNAME` | TEXT | YES | 100.0% | Name of the tax jurisdiction. This is typically the county with some exceptions. Exceptions are primarily in the New England area where the townships are the taxing authorities. |
| 5 | `SITUSSTATECOUNTYFIPS` | TEXT | YES | 100.0% | 5 digit numeric Federal Information Processing Standard (FIPS) code combining state and county codes where the property is located. |
| 6 | `COMBINEDSTATISTICALAREA` | TEXT | YES | 90.5% | Combined Statistical Area (CSA) Names - Area consisting of two or more adjacent metropolitan and micropolitan statistical areas that have substantial employment interchange as defined by the Office of Management and Budget (OMB). |
| 7 | `CBSANAME` | TEXT | YES | 100.0% | Core Based Statistical Area (CBSA) Name - A U.S. geographic area defined by the Office of Management and Budget (OMB). |
| 8 | `CBSACODE` | TEXT | YES | 100.0% | Core Based Statistical Area (CBSA) Code - A U.S. geographic area defined by the Office of Management and Budget (OMB). |
| 9 | `MSANAME` | TEXT | YES | 100.0% | Metropolitan Statistical Area Name as defined by the Office of Management and Budget (OMB). |
| 10 | `MSACODE` | TEXT | YES | 100.0% | Metropolitan Statistical Area Code as defined by the Office of Management and Budget (OMB). |
| 11 | `METROPOLITANDIVISION` | TEXT | YES | 35.2% | Metropolitan Division Name, as defined by the Office of Management and Budget (OMB). |
| 12 | `MINORCIVILDIVISIONNAME` | TEXT | YES | 99.4% | Minor Civil Division Name. i.e. Boroughs, Districts, Townships, etc… |
| 13 | `MINORCIVILDIVISIONCODE` | TEXT | YES | 99.4% | Minor Civil Division Code. 5 digit numeric code. |
| 14 | `NEIGHBORHOODCODE` | TEXT | YES | 100.0% | Assessor provided code used to delineate geographic areas. |
| 15 | `CENSUSFIPSPLACECODE` | TEXT | YES | 99.4% | US Census Designated Place Code for subject property |
| 16 | `CENSUSTRACT` | NUMBER | YES | 99.4% | US Census assigned Tract Code for subject property |
| 17 | `CENSUSBLOCKGROUP` | NUMBER | YES | 99.4% | US Census assigned Block Group for subject property. |
| 18 | `CENSUSBLOCK` | NUMBER | YES | 99.4% | US Census assigned Block for subject property. |
| 19 | `PARCELNUMBERRAW` | TEXT | YES | 100.0% | Primary Parcel Number and unique identifier within the county/jurisdiction |
| 20 | `PARCELNUMBERFORMATTED` | TEXT | YES | 0.0% | Legacy Parcel - Deprecated - No longer supported. |
| 21 | `PARCELNUMBERYEARADDED` | NUMBER | YES | 91.6% | The year that the current Parcel Number was introduced into the ATTOM Data databases |
| 22 | `PARCELNUMBERALTERNATE` | TEXT | YES | 100.0% | Secondary property identifier, not always unique. |
| 23 | `PARCELMAPBOOK` | TEXT | YES | 0.2% | Recorded, Survey or Plat Map Book reference for the parcel. |
| 24 | `PARCELMAPPAGE` | TEXT | YES | 0.2% | Recorded, Survey or Plat Map Page reference for the parcel |
| 25 | `PARCELNUMBERYEARCHANGE` | NUMBER | YES | 91.6% | Year of the latest Parcel Number change for respective property |
| 26 | `PARCELNUMBERPREVIOUS` | TEXT | YES | 100.0% | Previous parcel number assigned to the subject property. |
| 27 | `PARCELACCOUNTNUMBER` | TEXT | YES | 100.0% | Account Number of respective Parcel |
| 28 | `PROPERTYADDRESSFULL` | TEXT | YES | 100.0% | 123 1/2 N Main St - Full site address line |
| 29 | `PROPERTYADDRESSHOUSENUMBER` | TEXT | YES | 100.0% | 123 1/2 N Main St - Site address house number and fraction. |
| 30 | `PROPERTYADDRESSSTREETDIRECTION` | TEXT | YES | 100.0% | 123 1/2 N Main St - Site address pre directional. |
| 31 | `PROPERTYADDRESSSTREETNAME` | TEXT | YES | 100.0% | 123 1/2 N Main St - Site address street name. |
| 32 | `PROPERTYADDRESSSTREETSUFFIX` | TEXT | YES | 100.0% | 123 1/2 N Main St - Site address street name suffix. |
| 33 | `PROPERTYADDRESSSTREETPOSTDIRECTION` | TEXT | YES | 100.0% | 100 Center NW Pl., Unit 4a - Site address post-directional. |
| 34 | `PROPERTYADDRESSUNITPREFIX` | TEXT | YES | 100.0% | 100 Center NW Pl., Unit 4a - Site address unit number Prefix. |
| 35 | `PROPERTYADDRESSUNITVALUE` | TEXT | YES | 100.0% | 100 Center NW Pl., Unit 4a - Site address unit number. |
| 36 | `PROPERTYADDRESSCITY` | TEXT | YES | 100.0% | Anytown CA 90001-0001 CR0523 - Site address city name. |
| 37 | `PROPERTYADDRESSSTATE` | TEXT | YES | 100.0% | Anytown CA 90001-0001 CR0523 - Site address state. |
| 38 | `PROPERTYADDRESSZIP` | TEXT | YES | 100.0% | Anytown CA 90001-0001 CR0523 - Site address Zip Code. |
| 39 | `PROPERTYADDRESSZIP4` | TEXT | YES | 100.0% | Anytown CA 90001-0001 CR0523 - Site address Zip Plus 4 code. |
| 40 | `PROPERTYADDRESSCRRT` | TEXT | YES | 100.0% | Anytown CA 90001-0001 CR0523 - Site address Carrier Route. |
| 41 | `PROPERTYADDRESSINFOPRIVACY` | NUMBER | YES | 0.0% | Non-soliciation flag due to state/local restrictions, or ATTOMData derived. Not associated with DMAA or other databases - No longer supported. |
| 42 | `CONGRESSIONALDISTRICTHOUSE` | NUMBER | YES | 55.5% | Indicates the U.S. House of Representative Congressional District the property is located within. Supplemental geographical definition provided to assist with data analysis. |
| 43 | `LATITUDE` | FLOAT | YES | 99.5% | The latitude of the property in degrees. |
| 44 | `LONGITUDE` | FLOAT | YES | 99.5% | The longitude of the property in degrees. |
| 45 | `GEOQUALITYCODE` | TEXT | YES | 99.4% | Code to indicate the level of quality of the geocodes as determined by the geocoding process. |
| 46 | `LEGALDESCRIPTION` | TEXT | YES | 100.0% | Legal description as provided in the tax roll and / or recorded instruments. |
| 47 | `LEGALRANGE` | TEXT | YES | 100.0% | Range portion using the Township Range Survey System |
| 48 | `LEGALTOWNSHIP` | TEXT | YES | 100.0% | Township portion using the Township Range Survey System |
| 49 | `LEGALSECTION` | TEXT | YES | 100.0% | Section portion using the Township Range Survey System |
| 50 | `LEGALQUARTER` | TEXT | YES | 100.0% | Quarter portion using the Township Range Survey System |
| 51 | `LEGALQUARTERQUARTER` | TEXT | YES | 100.0% | Quarter Quarter portion using the Township Range Survey System |
| 52 | `LEGALSUBDIVISION` | TEXT | YES | 100.0% | Subdivision name |
| 53 | `LEGALPHASE` | TEXT | YES | 100.0% | Phase name / number |
| 54 | `LEGALTRACTNUMBER` | TEXT | YES | 100.0% | Tract number |
| 55 | `LEGALBLOCK1` | TEXT | YES | 100.0% | Block number - first of multiple |
| 56 | `LEGALBLOCK2` | TEXT | YES | 100.0% | Block number - second of multiple |
| 57 | `LEGALLOTNUMBER1` | TEXT | YES | 100.0% | Lot number - first of multiple |
| 58 | `LEGALLOTNUMBER2` | TEXT | YES | 100.0% | Lot number - second of multiple |
| 59 | `LEGALLOTNUMBER3` | TEXT | YES | 100.0% | Lot number - third of multiple |
| 60 | `LEGALUNIT` | TEXT | YES | 100.0% | Legal unit name or number. Multiple unit numbers may exist in the same field. |
| 61 | `PARTYOWNER1NAMEFULL` | TEXT | YES | 100.0% | Full name of the first individual.(i.e. JOHN L SMITH) |
| 62 | `PARTYOWNER1NAMEFIRST` | TEXT | YES | 56.5% | First name of the first individual. |
| 63 | `PARTYOWNER1NAMEMIDDLE` | TEXT | YES | 51.9% | Middle name or middle initial of the first individual. |
| 64 | `PARTYOWNER1NAMELAST` | TEXT | YES | 99.9% | Last name of the first individual. If name is a company, the name will be present in this field. |
| 65 | `PARTYOWNER1NAMESUFFIX` | TEXT | YES | 42.7% | Suffix (Jr., III, etc.) of first owner.. |
| 66 | `TRUSTDESCRIPTION` | TEXT | YES | 42.6% | Flag that indicates if primary owner is a trust. |
| 67 | `COMPANYFLAG` | TEXT | YES | 100.0% | Indicates if the property is owned by a non-individual entity. |
| 68 | `PARTYOWNER2NAMEFULL` | TEXT | YES | 100.0% | Full, unparsed name of second owner. (i.e. MARY M SMITH) |
| 69 | `PARTYOWNER2NAMEFIRST` | TEXT | YES | 47.8% | Fisrt name of second owner. |
| 70 | `PARTYOWNER2NAMEMIDDLE` | TEXT | YES | 45.7% | Middle name of second owner. |
| 71 | `PARTYOWNER2NAMELAST` | TEXT | YES | 63.0% | Last name of second owner. If name is a company, the name will be present in this field. |
| 72 | `PARTYOWNER2NAMESUFFIX` | TEXT | YES | 42.7% | Suffix (Jr., III, etc.) of second owner.. |
| 73 | `OWNERTYPEDESCRIPTION1` | TEXT | YES | 89.2% | Identifies if first owner is a company, individual or unknown |
| 74 | `OWNERSHIPVESTINGRELATIONCODE` | TEXT | YES | 100.0% | Indicates the ownership vesting held by the owner(s). |
| 75 | `PARTYOWNER3NAMEFULL` | TEXT | YES | 100.0% | Full, unparsed name of third owner. (i.e. MICHAEL T JONES) |
| 76 | `PARTYOWNER3NAMEFIRST` | TEXT | YES | 100.0% | First name of third owner. |
| 77 | `PARTYOWNER3NAMEMIDDLE` | TEXT | YES | 100.0% | Middle name of third owner. |
| 78 | `PARTYOWNER3NAMELAST` | TEXT | YES | 100.0% | Last name of third owner. If name is a company, the name will be present in this field. |
| 79 | `PARTYOWNER3NAMESUFFIX` | TEXT | YES | 100.0% | Suffix (Jr., III, etc.) of third owner.. |
| 80 | `PARTYOWNER4NAMEFULL` | TEXT | YES | 100.0% | Full, unparsed name of fourth owner. (i.e. CAROL S JONES) |
| 81 | `PARTYOWNER4NAMEFIRST` | TEXT | YES | 100.0% | First name of fourth owner. |
| 82 | `PARTYOWNER4NAMEMIDDLE` | TEXT | YES | 100.0% | Middle name of fourth owner. |
| 83 | `PARTYOWNER4NAMELAST` | TEXT | YES | 100.0% | Last name of fourth owner. If name is a company, the name will be present in this field. |
| 84 | `PARTYOWNER4NAMESUFFIX` | TEXT | YES | 100.0% | Suffix (Jr., III, etc.) of fourth owner.. |
| 85 | `OWNERTYPEDESCRIPTION2` | TEXT | YES | 17.6% | Identifies if second owner is a company, individual or unknown |
| 86 | `CONTACTOWNERMAILINGCOUNTY` | TEXT | YES | 99.6% | Mailing county of the property owner. |
| 87 | `CONTACTOWNERMAILINGFIPS` | TEXT | YES | 99.6% | Mailing Federal Information Processing Standard (FIPS) code for the county. |
| 88 | `CONTACTOWNERMAILADDRESSFULL` | TEXT | YES | 100.0% | 123 1/2 N Main St - Full mailing address. |
| 89 | `CONTACTOWNERMAILADDRESSHOUSENUMBER` | TEXT | YES | 100.0% | 123 1/2 N Main St - Mailing address house number and fraction. |
| 90 | `CONTACTOWNERMAILADDRESSSTREETDIRECTION` | TEXT | YES | 100.0% | 123 1/2 N Main St - Mailing address pre-directional. |
| 91 | `CONTACTOWNERMAILADDRESSSTREETNAME` | TEXT | YES | 100.0% | 123 1/2 N Main St - Mailing address street name. |
| 92 | `CONTACTOWNERMAILADDRESSSTREETSUFFIX` | TEXT | YES | 100.0% | 123 1/2 N Main St - Mailing address street name suffix. |
| 93 | `CONTACTOWNERMAILADDRESSSTREETPOSTDIRECTION` | TEXT | YES | 100.0% | 100 Center NW Pl., Unit 4a - Mailing address post-directional. |
| 94 | `CONTACTOWNERMAILADDRESSUNITPREFIX` | TEXT | YES | 100.0% | 100 Center NW Pl., Unit 4a - Mailing address unit number prefix. |
| 95 | `CONTACTOWNERMAILADDRESSUNIT` | TEXT | YES | 100.0% | 100 Center NW Pl., Unit 4a - Mailing address unit number. |
| 96 | `CONTACTOWNERMAILADDRESSCITY` | TEXT | YES | 100.0% | Anytown CA 90001-0001 CR0523 - Mailing city. |
| 97 | `CONTACTOWNERMAILADDRESSSTATE` | TEXT | YES | 100.0% | Anytown CA 90001-0001 CR0523 - Mailing state. |
| 98 | `CONTACTOWNERMAILADDRESSZIP` | TEXT | YES | 100.0% | Anytown CA 90001-0001 CR0523 - Mailing zip code. |
| 99 | `CONTACTOWNERMAILADDRESSZIP4` | TEXT | YES | 100.0% | Anytown CA 90001-0001 CR0523 - Mailing zip plus 4 code. |
| 100 | `CONTACTOWNERMAILADDRESSCRRT` | TEXT | YES | 100.0% | Anytown CA 90001-0001 CR0523 - Mailing carrier route. |
| 101 | `CONTACTOWNERMAILADDRESSINFOFORMAT` | TEXT | YES | 91.6% | Mailing Standard U.S., PO Box, Rural Route, etc. |
| 102 | `CONTACTOWNERMAILINFOPRIVACY` | TEXT | YES | 0.0% | Non-soliciation flag due to state/local restrictions, or ATTOMData derived. Not associated with DMAA or other databases - No longer supported. |
| 103 | `STATUSOWNEROCCUPIEDFLAG` | TEXT | YES | 77.2% | Owner status - Absentee or Occupied - Logic based. |
| 104 | `DEEDOWNER1NAMEFULL` | TEXT | YES | 100.0% | The full unparsed owner's name on the latest Deed. |
| 105 | `DEEDOWNER1NAMEFIRST` | TEXT | YES | 100.0% | The first deed owner's first name of the property. |
| 106 | `DEEDOWNER1NAMEMIDDLE` | TEXT | YES | 100.0% | The first deed owner's middle name of the property. |
| 107 | `DEEDOWNER1NAMELAST` | TEXT | YES | 100.0% | The first deed owner's last name of the property. If name is a company, the name will be present in this field. |
| 108 | `DEEDOWNER1NAMESUFFIX` | TEXT | YES | 100.0% | The first deed owner's name suffix of the property. |
| 109 | `DEEDOWNER2NAMEFULL` | TEXT | YES | 100.0% | The second full unparsed owner's name on the latest Deed. |
| 110 | `DEEDOWNER2NAMEFIRST` | TEXT | YES | 100.0% | The second deed owner's first name of the property. |
| 111 | `DEEDOWNER2NAMEMIDDLE` | TEXT | YES | 100.0% | The second deed owner's middle name of the property. |
| 112 | `DEEDOWNER2NAMELAST` | TEXT | YES | 100.0% | The second deed owner's last name of the property. If name is a company, the name will be present in this field. |
| 113 | `DEEDOWNER2NAMESUFFIX` | TEXT | YES | 100.0% | The second deed owner's name suffix of the property. |
| 114 | `DEEDOWNER3NAMEFULL` | TEXT | YES | 100.0% | The third full unparsed owner's name on the latest Deed. |
| 115 | `DEEDOWNER3NAMEFIRST` | TEXT | YES | 100.0% | The third deed owner's first name of the property. |
| 116 | `DEEDOWNER3NAMEMIDDLE` | TEXT | YES | 100.0% | The third deed owner's middle name of the property. |
| 117 | `DEEDOWNER3NAMELAST` | TEXT | YES | 100.0% | The third deed owner's last name of the property. If name is a company, the name will be present in this field. |
| 118 | `DEEDOWNER3NAMESUFFIX` | TEXT | YES | 100.0% | The third deed owner's name suffix of the property. |
| 119 | `DEEDOWNER4NAMEFULL` | TEXT | YES | 100.0% | The fourth full unparsed owner's name on the latest Deed. |
| 120 | `DEEDOWNER4NAMEFIRST` | TEXT | YES | 100.0% | The fourth deed owner's first name of the property. |
| 121 | `DEEDOWNER4NAMEMIDDLE` | TEXT | YES | 100.0% | The fourth deed owner's middle name of the property. |
| 122 | `DEEDOWNER4NAMELAST` | TEXT | YES | 100.0% | The fourth deed owner's last name of the property. If name is a company, the name will be present in this field. |
| 123 | `DEEDOWNER4NAMESUFFIX` | TEXT | YES | 100.0% | The fourth deed owner's name suffix of the property. |
| 124 | `TAXYEARASSESSED` | NUMBER | YES | 100.0% | Year of assessed values |
| 125 | `TAXASSESSEDVALUETOTAL` | NUMBER | YES | 100.0% | Total assessed value |
| 126 | `TAXASSESSEDVALUEIMPROVEMENTS` | NUMBER | YES | 100.0% | Assessed value of the improvement(s) |
| 127 | `TAXASSESSEDVALUELAND` | NUMBER | YES | 100.0% | Assessed value of the land |
| 128 | `TAXASSESSEDIMPROVEMENTSPERC` | NUMBER | YES | 100.0% | Percentage of the assessed improvement value against the total value |
| 129 | `PREVIOUSASSESSEDVALUE` | NUMBER | YES | 99.4% | Previous Total assessed value |
| 130 | `TAXMARKETVALUEYEAR` | NUMBER | YES | 99.7% | Year of above market values |
| 131 | `TAXMARKETVALUETOTAL` | NUMBER | YES | 100.0% | Total market value |
| 132 | `TAXMARKETVALUEIMPROVEMENTS` | NUMBER | YES | 100.0% | Market value of the improvement(s) |
| 133 | `TAXMARKETVALUELAND` | NUMBER | YES | 100.0% | Market value of the land |
| 134 | `TAXMARKETIMPROVEMENTSPERC` | NUMBER | YES | 100.0% | Percentage of the market improvement value against the total value |
| 135 | `TAXFISCALYEAR` | NUMBER | YES | 100.0% | The respective year of the property taxes being provided. (Note: may not be associated with values |
| 136 | `TAXRATEAREA` | TEXT | YES | 98.9% | Indicates one or multiple taxing district codes and/or district names |
| 137 | `TAXBILLEDAMOUNT` | NUMBER | YES | 87.0% | Tax Amount billed for the above mentioned Tax Year |
| 138 | `TAXDELINQUENTYEAR` | NUMBER | YES | 2.9% | Indicates the most recent year of tax delinquency. |
| 139 | `LASTASSESSORTAXROLLUPDATE` | DATE | YES | 100.0% | Date of current tax roll's load date. |
| 140 | `ASSRLASTUPDATED` | DATE | YES | 100.0% | Date of most recent update to the tax roll, same if no update since the load date. |
| 141 | `TAXEXEMPTIONHOMEOWNERFLAG` | TEXT | YES | 1.8% | Homeowner exemption indicator |
| 142 | `TAXEXEMPTIONDISABLEDFLAG` | TEXT | YES | 0.2% | Disabled person exemption indicator |
| 143 | `TAXEXEMPTIONSENIORFLAG` | TEXT | YES | 0.2% | Senior person exemption indicator |
| 144 | `TAXEXEMPTIONVETERANFLAG` | TEXT | YES | 0.1% | Veteran exemption indicator |
| 145 | `TAXEXEMPTIONWIDOWFLAG` | TEXT | YES | 0.0% | Widow exemption indicator |
| 146 | `TAXEXEMPTIONADDITIONAL` | TEXT | YES | 2.2% | Other / Additional exemption indicator |
| 147 | `YEARBUILT` | NUMBER | YES | 97.2% | Year built of the primary structure. |
| 148 | `YEARBUILTEFFECTIVE` | NUMBER | YES | 17.0% | Adjusted year built based on condition and / or major structural changes of the structure. |
| 149 | `ZONEDCODELOCAL` | TEXT | YES | 100.0% | The jurisdiction-specific zoned use value. Typically codified by the controlling jurisdiction. |
| 150 | `PROPERTYUSEMUNI` | TEXT | YES | 100.0% | County-specific use code which is used to map the PropertyUseStandardized field. |
| 151 | `PROPERTYUSEGROUP` | TEXT | YES | 100.0% | General property type description; residential, commercial, other, etc. |
| 152 | `PROPERTYUSESTANDARDIZED` | TEXT | YES | 100.0% | Standardized value to describe property use. Derived from jurisdiction-specific zoned use value obtained from the Assessor. |
| 153 | `ASSESSORLASTSALEDATE` | DATE | YES | 80.6% | Date which the primary owner acquired the property as provided by the assessor. Formatted YYYY-MM-DD. |
| 154 | `ASSESSORLASTSALEAMOUNT` | NUMBER | YES | 91.4% | Amount paid by primary owner as provided by the assessor. |
| 155 | `ASSESSORPRIORSALEDATE` | DATE | YES | 100.0% | Date which previous owner acquired the property as provided by the assessor. Formatted YYYY-MM-DD. |
| 156 | `ASSESSORPRIORSALEAMOUNT` | NUMBER | YES | 100.0% | Amount paid by previous owner as provided by the assessor. |
| 157 | `LASTOWNERSHIPTRANSFERDATE` | DATE | YES | 60.9% | Last Sale date for the most recent ownership transfer. Could be the same as the AssessorLastSaleDate. Can convey that there has been a non-arms-length transfer after the most recent sale. Formatted YYYY-MM-DD. |
| 158 | `LASTOWNERSHIPTRANSFERDOCUMENTNUMBER` | TEXT | YES | 100.0% | Document number for the most recent ownership transfer. May be the same as the DeedLastSaleDocumentNumber. Can convey that there has been a non-arms-length transfer since the last resale. |
| 159 | `LASTOWNERSHIPTRANSFERTRANSACTIONID` | NUMBER | YES | 42.7% | The unique transaction identifier for the transaction on the last ownership transfer |
| 160 | `DEEDLASTSALEDOCUMENTBOOK` | TEXT | YES | 91.4% | The latest sale's document book #. |
| 161 | `DEEDLASTSALEDOCUMENTPAGE` | TEXT | YES | 91.4% | The latest sale's document page #. |
| 162 | `DEEDLASTDOCUMENTNUMBER` | TEXT | YES | 91.7% | The latest sale's document number. |
| 163 | `DEEDLASTSALEDATE` | DATE | YES | 80.5% | The latest sale's sale date. Formatted YYYY-MM-DD. |
| 164 | `DEEDLASTSALEPRICE` | NUMBER | YES | 91.4% | The latest sale's sale price. |
| 165 | `DEEDLASTSALETRANSACTIONID` | NUMBER | YES | 35.3% | The transaction ID of the recorder record that represents the last resale of the parcel. |
| 166 | `AREABUILDING` | NUMBER | YES | 100.0% | Total area square feet of all structures on the property, which can include; Hallways, Common Areas (Gym, Laundry, Mail, Pool, etc) and any other area determined by the specific county assessor. |
| 167 | `AREABUILDINGDEFINITIONCODE` | TEXT | YES | 98.7% | Details the area described by the AreaBuilding value. |
| 168 | `AREAGROSS` | NUMBER | YES | 52.9% | The total square footage of the property as provided by the assessor. |
| 169 | `AREA1STFLOOR` | NUMBER | YES | 60.7% | The sum of ground floor living square footage. May include unfinished square footage. |
| 170 | `AREA2NDFLOOR` | NUMBER | YES | 54.1% | The sum of second floor living square footage. May contain unfinished square footage. |
| 171 | `AREAUPPERFLOORS` | NUMBER | YES | 90.3% | The sum area of upper floors of all buildings on the property. |
| 172 | `AREALOTACRES` | NUMBER | YES | 100.0% | Indicates the lot size, in acres. |
| 173 | `AREALOTSF` | NUMBER | YES | 100.0% | Indicates the lot size, in square feet |
| 174 | `AREALOTDEPTH` | NUMBER | YES | 100.0% | Indicates the lot depth, in feet. |
| 175 | `AREALOTWIDTH` | NUMBER | YES | 100.0% | Indicates the lot width, in feet. |
| 176 | `ROOMSATTICAREA` | NUMBER | YES | 91.6% | The sum area of the attic of all buildings on the property. |
| 177 | `ROOMSATTICFLAG` | NUMBER | YES | 0.0% | Indicator that an attic exists. (attic area may still be null/blank) |
| 178 | `ROOMSBASEMENTAREA` | NUMBER | YES | 100.0% | The total area of the basement, in square feet. |
| 179 | `ROOMSBASEMENTAREAFINISHED` | NUMBER | YES | 0.0% | The square footage of the finished portion of the basement on the property. |
| 180 | `ROOMSBASEMENTAREAUNFINISHED` | NUMBER | YES | 0.0% | The square footage of the unfinished portion of the basement on the property. |
| 181 | `PARKINGGARAGE` | TEXT | YES | 12.6% | Indicates if a garage exists on the property and any additional information about the garage such as attached / detached, etc |
| 182 | `PARKINGGARAGEAREA` | NUMBER | YES | 91.6% | Garage square footage |
| 183 | `PARKINGCARPORT` | TEXT | YES | 100.0% | Indicates if a carport exists on the property |
| 184 | `PARKINGCARPORTAREA` | NUMBER | YES | 1.9% | If one or more carports exists on the property, the total area, in square feet. |
| 185 | `HVACCOOLINGDETAIL` | TEXT | YES | 41.1% | Indicates the method or system used to provide cooling. |
| 186 | `HVACHEATINGDETAIL` | TEXT | YES | 93.5% | Indicates the method or system used to provide heat. |
| 187 | `HVACHEATINGFUEL` | TEXT | YES | 1.2% | Indicates the primary heating fuel used. |
| 188 | `UTILITIESSEWAGEUSAGE` | TEXT | YES | 0.0% | Indicates if the sewer is used and, if known, the type of sewer used on the property. |
| 189 | `UTILITIESWATERSOURCE` | TEXT | YES | 0.0% | Indicates water source for the property. |
| 190 | `UTILITIESMOBILEHOMEHOOKUPFLAG` | NUMBER | YES | 100.0% | Indicates the presence of a mobile home utility hookup on the property or in the community. |
| 191 | `FOUNDATION` | TEXT | YES | 27.0% | Indicates the type of foundation for the primary structure on the property. |
| 192 | `CONSTRUCTION` | TEXT | YES | 100.0% | Construction Type |
| 193 | `INTERIORSTRUCTURE` | TEXT | YES | 1.9% | Construction materials used for the interior walls |
| 194 | `PLUMBINGFIXTURESCOUNT` | NUMBER | YES | 100.0% | This is a numerical field identifying the number of plumbing features reported by the county assessor in the primary building/improvement on the property. |
| 195 | `CONSTRUCTIONFIRERESISTANCECLASS` | TEXT | YES | 24.9% | Code that defines the structural fire resistance. |
| 196 | `SAFETYFIRESPRINKLERSFLAG` | NUMBER | YES | 100.0% | Indicates the presence of fire sprinklers. |
| 197 | `FLOORINGMATERIALPRIMARY` | NUMBER | YES | 1.0% | This field indicates the primary type of flooring in the structure. |
| 198 | `BATHCOUNT` | NUMBER | YES | 100.0% | The total number of rooms that are utilized as bathrooms. Includes partial bathrooms. Value may be interpreted. |
| 199 | `BATHPARTIALCOUNT` | NUMBER | YES | 100.0% | The total number of rooms that are utilized as bathrooms and are partial bathroom by common real estate definition. |
| 200 | `BEDROOMSCOUNT` | NUMBER | YES | 100.0% | The total number of rooms that can be qualified as bedrooms. |
| 201 | `ROOMSCOUNT` | NUMBER | YES | 100.0% | The total number of rooms for all the buildings on the property. If multiple buildings exist, the values are aggregated. |
| 202 | `STORIESCOUNT` | NUMBER | YES | 93.2% | The number of stories for the buildings on the property. If multiple buildings exist, the values are aggregated. |
| 203 | `UNITSCOUNT` | NUMBER | YES | 100.0% | The number of units encompassed by the property. |
| 204 | `ROOMSBONUSROOMFLAG` | NUMBER | YES | 100.0% | Indicates the presence of a bonus room. |
| 205 | `ROOMSBREAKFASTNOOKFLAG` | NUMBER | YES | 100.0% | Indicates the presence of a breakfast nook. |
| 206 | `ROOMSCELLARFLAG` | NUMBER | YES | 100.0% | Indicates the presence of a cellar. |
| 207 | `ROOMSCELLARWINEFLAG` | NUMBER | YES | 100.0% | Indicates the presence of a wine cellar. |
| 208 | `ROOMSEXERCISEFLAG` | NUMBER | YES | 100.0% | Indicates the presence of a exercise room. |
| 209 | `ROOMSFAMILYCODE` | TEXT | YES | 100.0% | Indicates the presence of a family room. |
| 210 | `ROOMSGAMEFLAG` | NUMBER | YES | 100.0% | Indicates the presence of a game room. |
| 211 | `ROOMSGREATFLAG` | NUMBER | YES | 100.0% | Indicates the presence of a great room. |
| 212 | `ROOMSHOBBYFLAG` | NUMBER | YES | 100.0% | Indicates the presence of a hobby room. |
| 213 | `ROOMSLAUNDRYFLAG` | NUMBER | YES | 100.0% | Indicates the presence of a laundry room. |
| 214 | `ROOMSMEDIAFLAG` | NUMBER | YES | 100.0% | Indicates the presence of a media room. |
| 215 | `ROOMSMUDFLAG` | NUMBER | YES | 100.0% | Indicates the presence of a mud room. |
| 216 | `ROOMSOFFICEAREA` | NUMBER | YES | 2.1% | If an office is present, details the office area of the propety. |
| 217 | `ROOMSOFFICEFLAG` | NUMBER | YES | 100.0% | Indicates the presence of an office on the property. |
| 218 | `ROOMSSAFEROOMFLAG` | NUMBER | YES | 100.0% | Indicates the presence of a safe room. |
| 219 | `ROOMSSITTINGFLAG` | NUMBER | YES | 100.0% | Indicates the presence of a sitting room. |
| 220 | `ROOMSSTORMSHELTER` | NUMBER | YES | 100.0% | Indicates the presence of a storm shelter. |
| 221 | `ROOMSSTUDYFLAG` | NUMBER | YES | 100.0% | Indicates the presence of a study. |
| 222 | `ROOMSSUNROOMFLAG` | NUMBER | YES | 100.0% | Indicates the presence of a sunroom. |
| 223 | `ROOMSUTILITYAREA` | NUMBER | YES | 0.2% | If a Utility Room is present, details the area of the utility room. |
| 224 | `ROOMSUTILITYCODE` | TEXT | YES | 100.0% | Indicates the presence of a utility room. |
| 225 | `FIREPLACE` | TEXT | YES | 2.1% | Indicates the presence/absence of a fireplace. It also indicates the type of fireplace the property contains. |
| 226 | `FIREPLACECOUNT` | NUMBER | YES | 90.3% | Indicates the number of fireplaces on a property. |
| 227 | `ACCESSIBILITYELEVATORFLAG` | NUMBER | YES | 14.4% | Indicates the presence of an elevator in the structures on the property. |
| 228 | `ACCESSIBILITYHANDICAPFLAG` | NUMBER | YES | 100.0% | Indicates the presence of accessibiliy features are present on the property or in the community. |
| 229 | `ESCALATORFLAG` | NUMBER | YES | 100.0% | Indicates the presence of one or more escalators on the property. |
| 230 | `CENTRALVACUUMFLAG` | NUMBER | YES | 9.7% | Indicates the presence of a central vaccuum system. |
| 231 | `CONTENTINTERCOMFLAG` | NUMBER | YES | 9.7% | Indicates the presence of a central intercom system is present on the property or in the community. |
| 232 | `CONTENTSOUNDSYSTEMFLAG` | NUMBER | YES | 100.0% | Indicates the presence of a installed sound system. |
| 233 | `WETBARFLAG` | NUMBER | YES | 100.0% | Indicates the presence of a built-in wet bar. |
| 234 | `SECURITYALARMFLAG` | NUMBER | YES | 9.7% | Indicates the presence of a hard-wired alarm system. |
| 235 | `STRUCTURESTYLE` | NUMBER | YES | 4.9% | Indicates the structural style or the presence of specific style elements in the structure. |
| 236 | `EXTERIOR1CODE` | TEXT | YES | 93.3% | Indicates the primary exterial wall covering material. |
| 237 | `ROOFMATERIAL` | TEXT | YES | 26.8% | Indicates the primary finish material of which the roof is made. |
| 238 | `ROOFCONSTRUCTION` | TEXT | YES | 3.3% | Indicates the primary roof framing structure (A-Frame, Gable, Mansard, etc.). |
| 239 | `CONTENTSTORMSHUTTERFLAG` | NUMBER | YES | 100.0% | Indicates the presence of storm shutters on the main structure. |
| 240 | `CONTENTOVERHEADDOORFLAG` | NUMBER | YES | 100.0% | Indicates the existence of an Overhead Door. |
| 241 | `VIEWDESCRIPTION` | TEXT | YES | 100.0% | Indicates the type of view from the property, or other site influence. |
| 242 | `PORCHCODE` | TEXT | YES | 7.2% | This indicates if a proch is present, and if so, potentially what type of porch. |
| 243 | `PORCHAREA` | NUMBER | YES | 90.9% | The total square footage of the porch(s) on the property . |
| 244 | `PATIOAREA` | NUMBER | YES | 90.3% | The square footage of the patio(s) for all structures on a property. |
| 245 | `DECKFLAG` | NUMBER | YES | 100.0% | Indicates the presence of a deck. |
| 246 | `DECKAREA` | NUMBER | YES | 90.3% | If a deck is present, this details the size of the deck in square feet. |
| 247 | `FEATUREBALCONYFLAG` | NUMBER | YES | 0.0% | Indicates the presence of a balcony. |
| 248 | `BALCONYAREA` | NUMBER | YES | 0.0% | If a Balcony is present, this details the size of the balcony in square feet. |
| 249 | `BREEZEWAYFLAG` | NUMBER | YES | 9.9% | Indicates the presence of a breezeway. |
| 250 | `PARKINGRVPARKINGFLAG` | NUMBER | YES | 100.0% | Indicates the presence of RV parking area is present on the property or in the community. |
| 251 | `PARKINGSPACECOUNT` | NUMBER | YES | 100.0% | The total number of parking spaces exclusive to the property. |
| 252 | `DRIVEWAYAREA` | NUMBER | YES | 90.4% | Area of driveway as defined by the assessor. |
| 253 | `DRIVEWAYMATERIAL` | TEXT | YES | 0.0% | Indicates if a driveway is present and if so, potentially, what type of driveway is present. |
| 254 | `POOL` | NUMBER | YES | 79.0% | Indicates if a pool exists on the property and any additional information about the pool. |
| 255 | `POOLAREA` | NUMBER | YES | 77.7% | The surface area of the pool identified by the Pool field. |
| 256 | `CONTENTSAUNAFLAG` | NUMBER | YES | 9.7% | Indicates the presence of a sauna room is present on the property or in the community. |
| 257 | `TOPOGRAPHYCODE` | NUMBER | YES | 91.6% | Indicates the topography of the property. |
| 258 | `FENCECODE` | TEXT | YES | 10.7% | Indicates the presence and/or type of fence on the property. |
| 259 | `FENCEAREA` | NUMBER | YES | 90.3% | Area of fence as defined by the assessor. |
| 260 | `COURTYARDFLAG` | NUMBER | YES | 100.0% | Indicates the presence of a courtyard on the property. |
| 261 | `COURTYARDAREA` | NUMBER | YES | 0.0% | Area of all courtyards as determined by the assessor. |
| 262 | `ARBORPERGOLAFLAG` | NUMBER | YES | 100.0% | Indicates the presence of an arbor pergola on the property is present on the property or in the community. |
| 263 | `SPRINKLERSFLAG` | NUMBER | YES | 26.3% | Indicates the presence of an installed lawn/garden sprinkler on the property. |
| 264 | `GOLFCOURSEGREENFLAG` | NUMBER | YES | 100.0% | Indicates the presence of a golf course green in the community |
| 265 | `TENNISCOURTFLAG` | NUMBER | YES | 100.0% | Indicates the presence of a tennis court is present on the property or in the community. |
| 266 | `SPORTSCOURTFLAG` | NUMBER | YES | 100.0% | Indicates the presence of a sports court is present on the property or in the community. |
| 267 | `ARENAFLAG` | TEXT | YES | 100.0% | Indicates the presence of an equestrian arena on the property. |
| 268 | `WATERFEATUREFLAG` | NUMBER | YES | 100.0% | Indicates the presence of a water feature (i.e. Koi pond) is present on the property or in the community. |
| 269 | `PONDFLAG` | NUMBER | YES | 100.0% | Indicates the presence of a pond is present on the property or in the community. |
| 270 | `BOATLIFTFLAG` | NUMBER | YES | 100.0% | Indicates the presence of a boat lift is present on the property or in the community. |
| 271 | `BUILDINGSCOUNT` | NUMBER | YES | 39.7% | The number of buildings on the property. |
| 272 | `BATHHOUSEAREA` | NUMBER | YES | 0.0% | If a bath house exist, potentially details its square footage. |
| 273 | `BATHHOUSEFLAG` | NUMBER | YES | 100.0% | Indicates the presence of a bath house on the property. |
| 274 | `BOATACCESSFLAG` | NUMBER | YES | 100.0% | Indicates the presence of a boat access is present on the property or in the community. |
| 275 | `BOATHOUSEAREA` | NUMBER | YES | 0.2% | If a boat house exist, potentially details its square footage. |
| 276 | `BOATHOUSEFLAG` | NUMBER | YES | 100.0% | Indicates the presence of a boat house on the property. |
| 277 | `CABINAREA` | NUMBER | YES | 0.0% | If a cabin exist, potentially details its square footage. |
| 278 | `CABINFLAG` | NUMBER | YES | 100.0% | Indicates the presence of a cabin on the property. |
| 279 | `CANOPYAREA` | NUMBER | YES | 25.3% | If a canopy exist, potentially details its square footage. |
| 280 | `CANOPYFLAG` | NUMBER | YES | 25.3% | Indicates the presence of a canopy on the property. |
| 281 | `GAZEBOAREA` | NUMBER | YES | 0.1% | If a gazebo exist, potentially details its square footage. |
| 282 | `GAZEBOFLAG` | NUMBER | YES | 9.8% | Indicates the presence of a gazebo on the property. |
| 283 | `GRAINERYAREA` | NUMBER | YES | 0.0% | If a grainery exist, potentially details its square footage. |
| 284 | `GRAINERYFLAG` | NUMBER | YES | 9.7% | Indicates the presence of a grainery on the property. |
| 285 | `GREENHOUSEAREA` | NUMBER | YES | 0.0% | If a greenhouse exist, potentially details its square footage. |
| 286 | `GREENHOUSEFLAG` | NUMBER | YES | 100.0% | Indicates the presence of a greenhouse on the property. |
| 287 | `GUESTHOUSEAREA` | NUMBER | YES | 0.0% | If a guest House exist, potentially details its square footage. |
| 288 | `GUESTHOUSEFLAG` | NUMBER | YES | 100.0% | Indicates the presence of a guest House on the property. |
| 289 | `KENNELAREA` | NUMBER | YES | 0.0% | If a kennel exist, potentially details its square footage. |
| 290 | `KENNELFLAG` | NUMBER | YES | 100.0% | Indicates the presence of a kennel on the property. |
| 291 | `LEANTOAREA` | NUMBER | YES | 0.0% | If a lean-to exist, potentially details its square footage. |
| 292 | `LEANTOFLAG` | NUMBER | YES | 9.8% | Indicates the presence of a lean-to roof on the property. |
| 293 | `LOADINGPLATFORMAREA` | NUMBER | YES | 1.3% | If a loading platform exist, potentially details its square footage. |
| 294 | `LOADINGPLATFORMFLAG` | NUMBER | YES | 100.0% | Indicates the presence of a loading platform on the property. |
| 295 | `MILKHOUSEAREA` | NUMBER | YES | 0.0% | If a milk house exist, potentially details its square footage. |
| 296 | `MILKHOUSEFLAG` | NUMBER | YES | 100.0% | Indicates the presence of a milk house on the property. |
| 297 | `OUTDOORKITCHENFIREPLACEFLAG` | NUMBER | YES | 100.0% | Indicates the presence of an outdoor kitchen fireplace is present on the property or in the community. |
| 298 | `POOLHOUSEAREA` | NUMBER | YES | 0.0% | If a pool house exist, potentially details its square footage. |
| 299 | `POOLHOUSEFLAG` | NUMBER | YES | 100.0% | Indicates the presence of a pool house on the property. |
| 300 | `POULTRYHOUSEAREA` | NUMBER | YES | 0.0% | If a poultry house exist, potentially details its square footage. |
| 301 | `POULTRYHOUSEFLAG` | NUMBER | YES | 100.0% | Indicates the presence of a poultry house on the property. |
| 302 | `QUONSETAREA` | NUMBER | YES | 0.0% | If a Quonset Hut exist, potentially details its square footage. |
| 303 | `QUONSETFLAG` | NUMBER | YES | 100.0% | Indicates the presence of a Quonset Hut on the property. |
| 304 | `SHEDAREA` | NUMBER | YES | 1.6% | If a shed exist, potentially details its square footage. |
| 305 | `SHEDCODE` | TEXT | YES | 100.0% | Indicates the presence of a shed on the property. |
| 306 | `SILOAREA` | NUMBER | YES | 0.0% | If a silo exist, potentially details its square footage. |
| 307 | `SILOFLAG` | NUMBER | YES | 100.0% | Indicates the presence of a silo on the property. |
| 308 | `STABLEAREA` | NUMBER | YES | 0.0% | If a stable exist, potentially details its square footage. |
| 309 | `STABLEFLAG` | NUMBER | YES | 100.0% | Indicates the presence of a stable on the property. |
| 310 | `STORAGEBUILDINGAREA` | NUMBER | YES | 2.9% | If a storage building exist, potentially details its square footage. |
| 311 | `STORAGEBUILDINGFLAG` | NUMBER | YES | 100.0% | Indicates the presence of a storage building on the property. |
| 312 | `UTILITYBUILDINGAREA` | NUMBER | YES | 0.6% | If a utility building exist, potentially details its square footage. |
| 313 | `UTILITYBUILDINGFLAG` | NUMBER | YES | 0.6% | Indicates the presence of a utility building on the property. |
| 314 | `POLESTRUCTUREAREA` | NUMBER | YES | 0.1% | If a pole structure exist, potentially details its square footage. |
| 315 | `POLESTRUCTUREFLAG` | NUMBER | YES | 100.0% | Indicates the presence of a pole structure on the property. |
| 316 | `COMMUNITYRECROOMFLAG` | NUMBER | YES | 0.0% | Identifies the presence of a community recreation room is present in the community |
| 317 | `PUBLICATIONDATE` | DATE | YES | 100.0% | Date the subject file was produced. |
| 318 | `PARCELSHELLRECORD` | NUMBER | YES | 100.0% | Property Record created from deed record. |
| 319 | `DBCREATEDATE` | TIMESTAMP_NTZ | YES | 100.0% | DateTime when this Record was created on the current cloud platform |
| 320 | `DBUPDATEDATE` | TIMESTAMP_NTZ | YES | 100.0% | DateTime when this Record was last updated on the current cloud platform |
| 321 | `DBDELETEDATE` | TIMESTAMP_NTZ | YES | 0.0% | DateTime when this Record was soft deleted on the current cloud platform |

## 3. RECORDER — Full Column Inventory

_Schema columns: 241. Population sample: up to 5,000 storage rows (TX)._

| # | Column Name | Data Type | Nullable | % Populated | Comment |
|---|-------------|-----------|----------|-------------|---------|
| 1 | `TRANSACTIONID` | NUMBER | YES | 100.0% | The unique transaction identifier for the transaction. |
| 2 | `ATTOMID` | NUMBER | YES | 100.0% | ATTOM Data's Unique parcel identifier. |
| 3 | `DOCUMENTRECORDINGSTATECODE` | TEXT | YES | 100.0% | The USPS standardized abbreviation for the state where the document was recorded. |
| 4 | `DOCUMENTRECORDINGCOUNTYNAME` | TEXT | YES | 100.0% | The county name associated with the Federal Information Processing Standards (FIPS) county code. |
| 5 | `DOCUMENTRECORDINGJURISDICTIONNAME` | TEXT | YES | 100.0% | Name of the tax jurisdiction. This is typically the county with some exceptions. Exceptions are primarily in the New England area where the townships are the taxing authorities. |
| 6 | `DOCUMENTRECORDINGCOUNTYFIPS` | TEXT | YES | 100.0% | 5 digit numeric Federal Information Processing Standard (FIPS) code combining state and county codes where the document is recorded. |
| 7 | `DOCUMENTTYPECODE` | TEXT | YES | 100.0% | Code identifying the type of document; grant deed, quit claim, etc. |
| 8 | `DOCUMENTNUMBERFORMATTED` | TEXT | YES | 100.0% | Document number created from document book/page or instrument number. Provided to enable a single column reference. |
| 9 | `DOCUMENTNUMBERLEGACY` | TEXT | YES | 100.0% | Contains the document number from previous platform(s), if different than the current value in DocumentNumberFormatted. |
| 10 | `INSTRUMENTNUMBER` | TEXT | YES | 100.0% | When the county indexes by a recorder's reference in the document or instrument format, this field will contain that value. Typical instructions call for the recording year to not be added to this field unless there are regional requirements. A stamped value of 2012 - 00012345 will generally be delivered as 12345. |
| 11 | `BOOK` | TEXT | YES | 100.0% | The transaction document number book (parsed). Can contain either the Recorder document book or the legal description book as provided on the document. |
| 12 | `PAGE` | TEXT | YES | 100.0% | The transaction document number page (parsed). Can contain either the Recorder document page or the legal description page as provided on the document. |
| 13 | `INSTRUMENTDATE` | DATE | YES | 81.8% | The date that the document was executed by the parties. May be the same or pre-date the recording date. |
| 14 | `RECORDINGDATE` | DATE | YES | 60.4% | Recordng date on document/instrument for the latest ownership change transaction. |
| 15 | `TRANSACTIONTYPE` | TEXT | YES | 0.0% | Place holder for future field. Currently, not populated. |
| 16 | `TRANSFERINFOPURCHASETYPECODE` | NUMBER | YES | 99.7% | For resale transactions, defines the type of resale; construction, subdivision, etc. |
| 17 | `FORECLOSUREAUCTIONSALE` | NUMBER | YES | 100.0% | Indicates that the transaction was the result of a foreclosure auction. |
| 18 | `TRANSFERINFODISTRESSCIRCUMSTANCECODE` | NUMBER | YES | 100.0% | ATTOM Data derived distress scenario. |
| 19 | `QUITCLAIMFLAG` | NUMBER | YES | 100.0% | Indicates that the transaction is a Quit Claim. |
| 20 | `TRANSFERINFOMULTIPARCELFLAG` | NUMBER | YES | 100.0% | Flag used to indicate a multiple parcel transaction. |
| 21 | `ARMSLENGTHFLAG` | NUMBER | YES | 100.0% | Deed representing a transfer between two otherwise unrelated or affiliated parties. |
| 22 | `PARTIALINTEREST` | TEXT | YES | 0.9% | Indicates if a percentage of the legal ownership was transferred. |
| 23 | `TRANSFERAMOUNT` | NUMBER | YES | 60.4% | Sale Price |
| 24 | `TRANSFERAMOUNTINFOACCURACY` | TEXT | YES | 0.3% | Details the type of transaction represented by the document. |
| 25 | `TRANSFERTAXTOTAL` | NUMBER | YES | 56.6% | Sum of Documentary Transfer Tax paid when recording a deed at the county, and based on the respective sale price. This amount is the sum of the City and County Transfer Tax |
| 26 | `TRANSFERTAXCITY` | NUMBER | YES | 10.9% | Documentary Transfer Tax paid when recording a deed at the county, and based on the respective sale price. This tax is at the city level |
| 27 | `TRANSFERTAXCOUNTY` | NUMBER | YES | 10.9% | Documentary Transfer Tax paid when recording a deed at the county, and based on the respective sale price. This tax is at the county level |
| 28 | `GRANTOR1NAMEFULL` | TEXT | YES | 100.0% | Full name of the first seller listed on the deed. |
| 29 | `GRANTOR1NAMEFIRST` | TEXT | YES | 100.0% | First name of the first seller listed on the deed. |
| 30 | `GRANTOR1NAMEMIDDLE` | TEXT | YES | 100.0% | Middle name or middle initial of the first seller listed on the deed. |
| 31 | `GRANTOR1NAMELAST` | TEXT | YES | 100.0% | Last name of the first seller listed on the deed. |
| 32 | `GRANTOR1NAMESUFFIX` | TEXT | YES | 100.0% | Suffix (Jr, III, etc.) of the first seller listed on the deed. |
| 33 | `GRANTOR1INFOENTITYCLASSIFICATION` | TEXT | YES | 15.6% | Derived field describing what type of entity the party is based on examination of the name and vesting. Sample values include individual / trust / company. |
| 34 | `GRANTOR1INFOOWNERTYPE` | TEXT | YES | 7.8% | Owner relationship type, i.e. married man, beneficiary, etc. |
| 35 | `GRANTOR2NAMEFULL` | TEXT | YES | 100.0% | Full name of the second seller listed on the deed. |
| 36 | `GRANTOR2NAMEFIRST` | TEXT | YES | 100.0% | First name of the second seller listed on the deed. |
| 37 | `GRANTOR2NAMEMIDDLE` | TEXT | YES | 100.0% | Middle name or middle initial of the second seller listed on the deed. |
| 38 | `GRANTOR2NAMELAST` | TEXT | YES | 100.0% | Last name of the second seller listed on the deed. |
| 39 | `GRANTOR2NAMESUFFIX` | TEXT | YES | 100.0% | Suffix (Jr, III, etc.) of the second seller listed on the deed. |
| 40 | `GRANTOR2INFOENTITYCLASSIFICATION` | TEXT | YES | 3.3% | Derived field describing what type of entity the party is based on examination of the name and vesting. Sample values include individual / trust / company. |
| 41 | `GRANTOR2INFOOWNERTYPE` | TEXT | YES | 1.5% | Owner relationship type, i.e. married man, beneficiary, etc. |
| 42 | `GRANTOR3NAMEFULL` | TEXT | YES | 100.0% | Full name of the third seller listed on the deed. |
| 43 | `GRANTOR3NAMEFIRST` | TEXT | YES | 100.0% | First name of the third seller listed on the deed. |
| 44 | `GRANTOR3NAMEMIDDLE` | TEXT | YES | 100.0% | Middle name or middle initial of the third seller listed on the deed. |
| 45 | `GRANTOR3NAMELAST` | TEXT | YES | 100.0% | Last name of the third seller listed on the deed. |
| 46 | `GRANTOR3NAMESUFFIX` | TEXT | YES | 100.0% | Suffix (Jr, III, etc.) of the third seller listed on the deed. |
| 47 | `GRANTOR3INFOENTITYCLASSIFICATION` | TEXT | YES | 0.8% | Derived field describing what type of entity the party is based on examination of the name and vesting. Sample values include individual / trust / company. |
| 48 | `GRANTOR4NAMEFULL` | TEXT | YES | 100.0% | Full name of the fourth seller listed on the deed. |
| 49 | `GRANTOR4NAMEFIRST` | TEXT | YES | 100.0% | First name of the fourth seller listed on the deed. |
| 50 | `GRANTOR4NAMEMIDDLE` | TEXT | YES | 100.0% | Middle name or middle initial of the fourth seller listed on the deed. |
| 51 | `GRANTOR4NAMELAST` | TEXT | YES | 100.0% | Last name of the fourth seller listed on the deed. |
| 52 | `GRANTOR4NAMESUFFIX` | TEXT | YES | 100.0% | Suffix (Jr, III, etc.) of the fourth seller listed on the deed. |
| 53 | `GRANTOR4INFOENTITYCLASSIFICATION` | TEXT | YES | 0.3% | Derived field describing what type of entity the party is based on examination of the name and vesting. Sample values include individual / trust / company. |
| 54 | `GRANTORADDRESSFULL` | TEXT | YES | 100.0% | Full unparsed address on the deed. |
| 55 | `GRANTORADDRESSHOUSENUMBER` | TEXT | YES | 100.0% | The house number and fraction of the address on the deed. |
| 56 | `GRANTORADDRESSSTREETDIRECTION` | TEXT | YES | 100.0% | The street direction of the address on the deed. |
| 57 | `GRANTORADDRESSSTREETNAME` | TEXT | YES | 100.0% | The street name of the address on the deed. |
| 58 | `GRANTORADDRESSSTREETSUFFIX` | TEXT | YES | 100.0% | The street suffix of the address on the deed. |
| 59 | `GRANTORADDRESSSTREETPOSTDIRECTION` | TEXT | YES | 100.0% | The street post direction of the address on the deed. |
| 60 | `GRANTORADDRESSUNITPREFIX` | TEXT | YES | 100.0% | The unit prefix of the address on the deed. |
| 61 | `GRANTORADDRESSUNITVALUE` | TEXT | YES | 100.0% | The unit value of the address on the deed. |
| 62 | `GRANTORADDRESSCITY` | TEXT | YES | 100.0% | The city of the address on the deed. |
| 63 | `GRANTORADDRESSSTATE` | TEXT | YES | 100.0% | The state of the address on the deed. |
| 64 | `GRANTORADDRESSZIP` | TEXT | YES | 100.0% | The zip of the address on the deed. |
| 65 | `GRANTORADDRESSZIP4` | TEXT | YES | 100.0% | The zip+4 of the address on the deed. |
| 66 | `GRANTORADDRESSCRRT` | TEXT | YES | 100.0% | The carrier route of the address on the deed. |
| 67 | `GRANTORADDRESSINFOFORMAT` | TEXT | YES | 4.7% | Standard U.S., PO Box, Rural Route, etc. |
| 68 | `GRANTORADDRESSINFOPRIVACY` | NUMBER | YES | 0.0% | Identifies if legal restrictions may apply in order to limit direct marketing campaigns. (Not associated with the DMAA's "No Mail" list ) |
| 69 | `GRANTEE1NAMEFULL` | TEXT | YES | 100.0% | Full name of the first individual on the recorded document. |
| 70 | `GRANTEE1NAMEFIRST` | TEXT | YES | 100.0% | First name of the first individual on the recorded document. |
| 71 | `GRANTEE1NAMEMIDDLE` | TEXT | YES | 100.0% | Middle name or middle initial of the first individual listed on the recorded document. |
| 72 | `GRANTEE1NAMELAST` | TEXT | YES | 100.0% | Last name of the first buyer listed on the recorded document. If name is a company, the name will be present in this field. |
| 73 | `GRANTEE1NAMESUFFIX` | TEXT | YES | 100.0% | Suffix of the first individual listed on the recorded document. |
| 74 | `GRANTEE1INFOENTITYCLASSIFICATION` | TEXT | YES | 95.5% | Derived field describing the type of entity based on examination of the name and vesting. |
| 75 | `GRANTEE1INFOOWNERTYPE` | TEXT | YES | 15.7% | Owner relationship type, i.e. married man, beneficiary, etc. |
| 76 | `GRANTEE2NAMEFULL` | TEXT | YES | 100.0% | Full name of the second individual on the recorded document. |
| 77 | `GRANTEE2NAMEFIRST` | TEXT | YES | 100.0% | First name of the second individual on the recorded document. Left blank if entity is not defined as an individual. |
| 78 | `GRANTEE2NAMEMIDDLE` | TEXT | YES | 100.0% | Middle name or middle initial of the second individual listed on the recorded document. |
| 79 | `GRANTEE2NAMELAST` | TEXT | YES | 100.0% | Last name of the second individual listed on the recorded document. If the entity is not an individual, will contain the full entity name. |
| 80 | `GRANTEE2NAMESUFFIX` | TEXT | YES | 100.0% | Suffix of the second buyer listed on the recorded document. |
| 81 | `GRANTEE2INFOENTITYCLASSIFICATION` | TEXT | YES | 13.0% | Derived field describing the type of entity based on examination of the name and vesting. |
| 82 | `GRANTEEINFOVESTING1` | TEXT | YES | 22.3% | Identifies the legal co-ownership method when more than one party is named as the Grantee on the recorded document. In cases where a single Grantee is listed, Sole Ownership is implied. |
| 83 | `GRANTEE3NAMEFULL` | TEXT | YES | 100.0% | Full name of the third individual on the recorded document. |
| 84 | `GRANTEE3NAMEFIRST` | TEXT | YES | 100.0% | First name of the third individual on the recorded document. Left blank if entity is not defined as an individual. |
| 85 | `GRANTEE3NAMEMIDDLE` | TEXT | YES | 100.0% | Middle name or middle initial of the third individual listed on the recorded document. |
| 86 | `GRANTEE3NAMELAST` | TEXT | YES | 100.0% | Last name of the third individual listed on the recorded document. If the entity is not an individual, will contain the full entity name. |
| 87 | `GRANTEE3NAMESUFFIX` | TEXT | YES | 100.0% | Suffix of the third individual listed on the recorded document. |
| 88 | `GRANTEE3INFOENTITYCLASSIFICATION` | TEXT | YES | 0.5% | Derived field describing the type of entity based on examination of the name and vesting. |
| 89 | `GRANTEE4NAMEFULL` | TEXT | YES | 100.0% | Full name of the fourth individual on the recorded document. |
| 90 | `GRANTEE4NAMEFIRST` | TEXT | YES | 100.0% | First name of the fourth individual on the recorded document. Left blank if entity is not defined as an individual. |
| 91 | `GRANTEE4NAMEMIDDLE` | TEXT | YES | 100.0% | Middle name or middle initial of the fourth individual listed on the recorded document. |
| 92 | `GRANTEE4NAMELAST` | TEXT | YES | 100.0% | Last name of the fourth individual listed on the recorded document. If the entity is not an individual, will contain the full entity name. |
| 93 | `GRANTEE4NAMESUFFIX` | TEXT | YES | 100.0% | Suffix of the fourth individual listed on the recorded document. |
| 94 | `GRANTEE4INFOENTITYCLASSIFICATION` | TEXT | YES | 0.1% | Derived field describing the type of entity based on examination of the name and vesting. |
| 95 | `GRANTEEMAILCAREOFNAME` | TEXT | YES | 100.0% | Alternate or Care Of name used by the grantee. |
| 96 | `GRANTEEINFOENTITYCOUNT` | NUMBER | YES | 19.9% | Count of all the distinct entities found on the Deed. |
| 97 | `GRANTEEINFOVESTING2` | TEXT | YES | 0.0% | Identifies the legal co-ownership method when more than one party is named as the Grantee on a deed. In cases where a single Grantee is listed, Sole Ownership is implied. |
| 98 | `GRANTEEINVESTORFLAG` | NUMBER | YES | 100.0% | Non-lending entity with more than 10 purchases in a calendar year. The 10th transaction (and any transaction thereafter) will have this flag set to 1. |
| 99 | `GRANTEEMAILADDRESSFULL` | TEXT | YES | 100.0% | Full Mailing address of buyer(s) or borrower(s) on the recorded document. |
| 100 | `GRANTEEMAILADDRESSHOUSENUMBER` | TEXT | YES | 100.0% | House number and fraction segment of the mailing address. |
| 101 | `GRANTEEMAILADDRESSSTREETDIRECTION` | TEXT | YES | 100.0% | Street direction segment of the mailing address. |
| 102 | `GRANTEEMAILADDRESSSTREETNAME` | TEXT | YES | 100.0% | Street name segment of the mailing address. |
| 103 | `GRANTEEMAILADDRESSSTREETSUFFIX` | TEXT | YES | 100.0% | Street suffix segment of the mailing address. |
| 104 | `GRANTEEMAILADDRESSSTREETPOSTDIRECTION` | TEXT | YES | 100.0% | Street post direction segment of the mailing address. |
| 105 | `GRANTEEMAILADDRESSUNITPREFIX` | TEXT | YES | 100.0% | Unit prefix segment of the mailing address. |
| 106 | `GRANTEEMAILADDRESSUNITVALUE` | TEXT | YES | 100.0% | Unit value segment of the mailing address. |
| 107 | `GRANTEEMAILADDRESSCITY` | TEXT | YES | 100.0% | City segment of the mailing address. |
| 108 | `GRANTEEMAILADDRESSSTATE` | TEXT | YES | 100.0% | Two character State segment of the mailing address. |
| 109 | `GRANTEEMAILADDRESSZIP` | TEXT | YES | 100.0% | Five Digit ZIP Code segment of the mailing address. |
| 110 | `GRANTEEMAILADDRESSZIP4` | TEXT | YES | 100.0% | ZIP-4 segment of the mailing address. |
| 111 | `GRANTEEMAILADDRESSCRRT` | TEXT | YES | 100.0% | Carrier route segment of the mailing address. |
| 112 | `GRANTEEMAILADDRESSINFOFORMAT` | TEXT | YES | 13.6% | Derived field. Code to indicate the classification of the address. Examples include U.S. Standard, PO Box, and Rural Route. |
| 113 | `GRANTEEMAILADDRESSINFOPRIVACY` | NUMBER | YES | 0.0% | Identifies if legal restrictions may apply in order to limit direct marketing campaigns. (Not associated with the DMAA's "No Mail" list ) |
| 114 | `GRANTEEGRANTOROWNERRELATIONSHIPCODE` | TEXT | YES | 0.0% | Identifies the relationship, if any, between the grantee and the grantor |
| 115 | `TITLECOMPANYSTANDARDIZEDCODE` | TEXT | YES | 100.0% | Standard code identifying the title company. |
| 116 | `TITLECOMPANYSTANDARDIZEDNAME` | TEXT | YES | 100.0% | Standardized name of the title company. |
| 117 | `TITLECOMPANYRAW` | TEXT | YES | 100.0% | Name of the title company as keyed. Name is not standardized. |
| 118 | `LEGALDESCRIPTIONPART1` | TEXT | YES | 100.0% | Maps to the LegalLot, LegalBlock, LegalTract and LegalUnit where both are populated. Where the parsed fields do not contain a value, this value is populated based on jurisdictional rules. |
| 119 | `LEGALDESCRIPTIONPART2` | TEXT | YES | 100.0% | Maps to the Legasubdivision where both are populated. Where the parsed fields do not contain a value, this value is populated based on jurisdictional rules. |
| 120 | `LEGALDESCRIPTIONPART3` | TEXT | YES | 100.0% | Maps to the LegalPlatMapBook and LegalPlatMapPage where both are populated. Where the parsed fields do not contain a value, this value is populated based on jurisdictional rules. |
| 121 | `LEGALDESCRIPTIONPART4` | TEXT | YES | 100.0% | Maps to the LegalSection, LegalTownship and LegalRange where both are populated. Where the parsed fields do not contain a value, this value is populated based on jurisdictional rules. |
| 122 | `LEGALRANGE` | TEXT | YES | 100.0% | The Range segment in relationship to the Public Land Survey System (Section/Township/Range) |
| 123 | `LEGALTOWNSHIP` | TEXT | YES | 100.0% | The Township segment in relationship to the Public Land Survey System (Section/Township/Range) |
| 124 | `LEGALSECTION` | TEXT | YES | 100.0% | The Section segment in relationship to the Public Land Survey System (Section/Township/Range) |
| 125 | `LEGALDISTRICT` | TEXT | YES | 100.0% | The district in which the property is located. |
| 126 | `LEGALSUBDIVISION` | TEXT | YES | 100.0% | The name of the subdivision, plat, or tract in which the property is located. |
| 127 | `LEGALTRACT` | TEXT | YES | 100.0% | The number of the tract in which the property is located. Followed by "POR" (portion of) when applicable. |
| 128 | `LEGALBLOCK` | TEXT | YES | 100.0% | The legal block number(s) associated with the subject property, or portions thereof |
| 129 | `LEGALLOT` | TEXT | YES | 100.0% | The legal lot number(s) associated with the subject property, or portions thereof. |
| 130 | `LEGALUNIT` | TEXT | YES | 100.0% | The subdivision unit number. Common for condominiums, townhomes, etc. Not necessarily the same as the Property Unit Number |
| 131 | `LEGALPLATMAPBOOK` | TEXT | YES | 100.0% | The plat map book where the parcel plat map is located |
| 132 | `LEGALPLATMAPPAGE` | TEXT | YES | 100.0% | The plat map book where the parcel page map is located |
| 133 | `APNFORMATTED` | TEXT | YES | 100.0% | Primary Parcel Number |
| 134 | `APNORIGINAL` | TEXT | YES | 0.0% | Legacy Parcel - Depricated - No longer supported. |
| 135 | `PROPERTYADDRESSFULL` | TEXT | YES | 100.0% | Full standardized subject property address. |
| 136 | `PROPERTYADDRESSHOUSENUMBER` | TEXT | YES | 100.0% | House number and fraction segment of the subject property address. |
| 137 | `PROPERTYADDRESSSTREETDIRECTION` | TEXT | YES | 100.0% | Street direction segment of the subject property address. |
| 138 | `PROPERTYADDRESSSTREETNAME` | TEXT | YES | 100.0% | Street name segment of the subject property address. |
| 139 | `PROPERTYADDRESSSTREETSUFFIX` | TEXT | YES | 100.0% | Street suffix segment of the subject property address. |
| 140 | `PROPERTYADDRESSSTREETPOSTDIRECTION` | TEXT | YES | 100.0% | Street post direction segment of the subject property address. |
| 141 | `PROPERTYADDRESSUNITPREFIX` | TEXT | YES | 100.0% | Unit prefix segment of the subject property address. |
| 142 | `PROPERTYADDRESSUNITVALUE` | TEXT | YES | 100.0% | Unit value segment of the subject property address. |
| 143 | `PROPERTYADDRESSCITY` | TEXT | YES | 100.0% | City segment of the subject property address. |
| 144 | `PROPERTYADDRESSSTATE` | TEXT | YES | 100.0% | Two character State segment of the subject property address. |
| 145 | `PROPERTYADDRESSZIP` | TEXT | YES | 100.0% | Five Digit ZIP Code segment of the subject property address. |
| 146 | `PROPERTYADDRESSZIP4` | TEXT | YES | 100.0% | ZIP-4 segment of the subject property address. |
| 147 | `PROPERTYADDRESSCRRT` | TEXT | YES | 100.0% | Carrier route segment of the subject property address. |
| 148 | `PROPERTYADDRESSINFOFORMAT` | TEXT | YES | 84.0% | Standard U.S., PO Box, Rural Route, etc |
| 149 | `PROPERTYADDRESSINFOPRIVACY` | NUMBER | YES | 0.0% | Identifies if legal restrictions may apply in order to limit direct marketing campaigns. (Not associated with the DMAA's "No Mail" list ) |
| 150 | `RECORDERMAPREFERENCE` | TEXT | YES | 100.0% | Standardized to identify each portion. Multiples indicated with the ampersand (&), and ranges separated with a hyphen (-). Depending on the length of the Map Reference, spaces may be omitted. |
| 151 | `PROPERTYUSEGROUP` | TEXT | YES | 100.0% | General property type description; residential, commercial, industrial, etc. |
| 152 | `PROPERTYUSESTANDARDIZED` | TEXT | YES | 100.0% | Standardized value to describe the property's intended land use. Derived from specific land use information obtained from the Assessor. |
| 153 | `MORTGAGE1DOCUMENTNUMBERFORMATTED` | TEXT | YES | 100.0% | Document number created from document book/page or instrument number. Provided to enable a single column reference. Raw data are delivered in 3 additional columns. |
| 154 | `MORTGAGE1DOCUMENTNUMBERLEGACY` | TEXT | YES | 100.0% | Contains the loan instrument or book/page number stamped or printed on the first sequence trust deed that is recorded with the purchase transaction. |
| 155 | `MORTGAGE1INSTRUMENTNUMBER` | TEXT | YES | 100.0% | Document or instrument format, this field will contain that value. Typical instructions call for the recording year to not be added to this field unless there are regional requirements. A stamped value of 2012 - 00012345 will generally be delivered as 12345. |
| 156 | `MORTGAGE1BOOK` | TEXT | YES | 100.0% | The instrument's book number referenced/stamped for the 1st mortgage/deed of trust. |
| 157 | `MORTGAGE1PAGE` | TEXT | YES | 100.0% | The instrument's page number referenced/stamped for the 1st mortgage/deed of trust. |
| 158 | `MORTGAGE1RECORDINGDATE` | DATE | YES | 67.1% | The recording date referenced/stamped on the 1st mortgage/deed of trust. |
| 159 | `MORTGAGE1TYPE` | TEXT | YES | 21.3% | Loan Type on the 1st mortgage/deed of trust - See Technical Details tab. |
| 160 | `MORTGAGE1AMOUNT` | NUMBER | YES | 69.7% | Loan Amount for the 1st mortgage/deed of trust. |
| 161 | `MORTGAGE1LENDERCODE` | NUMBER | YES | 100.0% | Unique Lender Code assigned to the respective lender's name below. |
| 162 | `MORTGAGE1LENDERNAMEFULLSTANDARDIZED` | TEXT | YES | 100.0% | Standardized Full Lender Name |
| 163 | `MORTGAGE1LENDERNAMEFIRST` | TEXT | YES | 100.0% | For private individuals, the first name of the first lender. For companies, the complete name of the first lender. |
| 164 | `MORTGAGE1LENDERNAMELAST` | TEXT | YES | 100.0% | For private individuals, the last name of the first lender. |
| 165 | `MORTGAGE1LENDERADDRESS` | TEXT | YES | 100.0% | 1st Lender's address |
| 166 | `MORTGAGE1LENDERADDRESSCITY` | TEXT | YES | 100.0% | City segment of the 1st Lender's address. |
| 167 | `MORTGAGE1LENDERADDRESSSTATE` | TEXT | YES | 100.0% | Two character State segment of the 1st Lender's address. |
| 168 | `MORTGAGE1LENDERADDRESSZIP` | TEXT | YES | 100.0% | Five Digit ZIP Code segment of the 1st Lender's address. |
| 169 | `MORTGAGE1LENDERADDRESSZIP4` | TEXT | YES | 100.0% | ZIP-4 segment of the 1st Lender's address. |
| 170 | `MORTGAGE1LENDERINFOENTITYCLASSIFICATION` | TEXT | YES | 57.2% | Not Supported |
| 171 | `MORTGAGE1LENDERINFOSELLERCARRYBACKFLAG` | NUMBER | YES | 55.2% | An indicator whether a seller is the lender on this particular loan. |
| 172 | `MORTGAGE1TERM` | NUMBER | YES | 31.3% | The term/duration of the loan. Refer to Mortgage1TermType for the term unit. |
| 173 | `MORTGAGE1TERMTYPE` | TEXT | YES | 17.5% | Indicates the term type (month, year) of the mortgage term indicated in Mortgage1Term. |
| 174 | `MORTGAGE1TERMDATE` | DATE | YES | 17.5% | The date the loan represented on Mortgage1DocumentNumberFormatted is due |
| 175 | `MORTGAGE1INFOPREPAYMENTPENALTYFLAG` | TEXT | YES | 0.0% | Flag to indicate if the loan terms includes pre-payment penalty. |
| 176 | `MORTGAGE1INFOPREPAYMENTTERM` | TEXT | YES | 100.0% | The number of months that the originated loan must remain active. If the loan is paid off early, the borrower will pay a prepayment penalty. Always expressed in months: 12, 18, 24, 36 are the most common. |
| 177 | `MORTGAGE1INTERESTRATETYPE` | TEXT | YES | 100.0% | When available will indicate the type of interest rate terms for the concurrent Deed of Trust. Left blank if unknown. |
| 178 | `MORTGAGE1INTERESTRATE` | NUMBER | YES | 40.1% | Interest rate for the loan related to Mortgage1DocumentNumber |
| 179 | `MORTGAGE1INTERESTTYPEINITIAL` | TEXT | YES | 100.0% | Indicates the initial state of the interest rate on the loan is fixed or adjustable. |
| 180 | `MORTGAGE1FIXEDSTEPCONVERSIONRATE` | TEXT | YES | 0.0% | The rate to which the interest will change in a fixed step conversion mortgage. |
| 181 | `MORTGAGE1DOCUMENTINFORIDERADJUSTABLERATEFLAG` | TEXT | YES | 0.0% | Flag to indicate if an adjustable rate rider was part of the document. |
| 182 | `MORTGAGE1INFOINTERESTTYPECHANGEYEAR` | NUMBER | YES | 0.2% | The year the loan converts from fixed rate to adjustable rate. Month and day of the conversion, if known, are housed in separate fields. |
| 183 | `MORTGAGE1INFOINTERESTTYPECHANGEMONTH` | NUMBER | YES | 0.2% | The month the loan converts from fixed rate to adjustable rate. Year and day of the conversion, if known, are housed in separate fields. |
| 184 | `MORTGAGE1INFOINTERESTTYPECHANGEDAY` | NUMBER | YES | 0.2% | The day of the month the loan converts from fixed rate to adjustable rate. Month and year of the conversion, if known, are housed in separate fields. |
| 185 | `MORTGAGE1INTERESTRATEMINFIRSTCHANGERATECONVERSION` | NUMBER | YES | 20.6% | Applies only to adjustable rate loans. The minimum interest rate allowed on the first change date (date when loan switched from a fixed to an adjustable interest rate) |
| 186 | `MORTGAGE1INTERESTRATEMAXFIRSTCHANGERATECONVERSION` | NUMBER | YES | 20.6% | Applies only to adjustable rate loans. The maximum interest rate allowed on the first change date (date when loan switched from a fixed to an adjustable interest rate) |
| 187 | `MORTGAGE1INTERESTCHANGEFREQUENCY` | TEXT | YES | 0.6% | The time defined between interest rate resets in an adjustable rate loan |
| 188 | `MORTGAGE1INTERESTMARGIN` | NUMBER | YES | 20.6% | A fixed percentage rate that is added to an index value to determine the fully indexed interest rate of an adjustable rate mortgage |
| 189 | `MORTGAGE1INTERESTINDEX` | NUMBER | YES | 20.6% | The benchmark interest rate an adjustable-rate mortgage's fully indexed interest rate is based on |
| 190 | `MORTGAGE1INTERESTRATEMAX` | NUMBER | YES | 20.6% | Applies to adjustable rate loans. The maximum interest rate allowed for the loan. |
| 191 | `MORTGAGE1ADJUSTABLERATEINDEX` | TEXT | YES | 0.1% | The benchmark interest rate to which an adjustable rate mortgage is tied |
| 192 | `MORTGAGE1INTERESTONLYFLAG` | NUMBER | YES | 0.0% | Flag to indicate if the loan has an interest only period. No longer supported. |
| 193 | `MORTGAGE1INTERESTONLYPERIOD` | TEXT | YES | 0.0% | If available, the actual length of interest only period in years. |
| 194 | `MORTGAGE2DOCUMENTNUMBERFORMATTED` | TEXT | YES | 100.0% | Document number created from document book/page or instrument number. Provided to enable a single column reference. Raw data are delivered in 3 additional columns. |
| 195 | `MORTGAGE2DOCUMENTNUMBERLEGACY` | TEXT | YES | 100.0% | Contains the loan instrument or book/page number stamped or printed on the first sequence trust deed that is recorded with the purchase transaction. |
| 196 | `MORTGAGE2INSTRUMENTNUMBER` | TEXT | YES | 100.0% | Document or instrument format, this field will contain that value. Typical instructions call for the recording year to not be added to this field unless there are regional requirements. A stamped value of 2012 - 00012345 will generally be delivered as 12345. |
| 197 | `MORTGAGE2BOOK` | TEXT | YES | 100.0% | The transaction document number book (parsed). Can contain either the Recorder document book or the legal description book as provided on the document. |
| 198 | `MORTGAGE2PAGE` | TEXT | YES | 100.0% | The transaction document number page (parsed). Can contain either the Recorder document page or the legal description page as provided on the document. |
| 199 | `MORTGAGE2RECORDINGDATE` | DATE | YES | 1.1% | Contains the official filing date for the transaction that is normally stamped or printed on the document. |
| 200 | `MORTGAGE2TYPE` | TEXT | YES | 0.2% | Loan Type on the 2nd mortgage/deed of trust. |
| 201 | `MORTGAGE2AMOUNT` | NUMBER | YES | 11.0% | Indicates the loan amount, as present on the deed of trust, for the loan represented by Mortgage1DocumentNumberFormatted on the transaction. |
| 202 | `MORTGAGE2LENDERCODE` | NUMBER | YES | 100.0% | Contains the standard id code identifying the Lender/Beneficiary, for the loan represented by Mortgage2DocumentNumberFormatted. |
| 203 | `MORTGAGE2LENDERNAMEFULLSTANDARDIZED` | TEXT | YES | 100.0% | Full lender name, standardized to manage abbreviations, remove mis-spelling, etc. Partner field to Lender code. Can be used for lender matching. |
| 204 | `MORTGAGE2LENDERNAMEFIRST` | TEXT | YES | 100.0% | If the lender is a company, indicates the complete lender name for the loan represented by Mortgage2DocumentNumberFormatted field on the transaction. If the lender is an individual, indicates the lender's first name for the loan represented by Mortgage2DocumentNumberFormatted field on the transaction. |
| 205 | `MORTGAGE2LENDERNAMELAST` | TEXT | YES | 100.0% | If the lender is an individual, indicates the lender last name for the loan represented by Mortgage2DocumentNumberFormatted field on the transaction. |
| 206 | `MORTGAGE2LENDERADDRESS` | TEXT | YES | 100.0% | Full address of the lender on the second mortgage. |
| 207 | `MORTGAGE2LENDERADDRESSCITY` | TEXT | YES | 100.0% | City of the lender on the second mortgage. |
| 208 | `MORTGAGE2LENDERADDRESSSTATE` | TEXT | YES | 100.0% | State of the lender on the second mortgage. |
| 209 | `MORTGAGE2LENDERADDRESSZIP` | TEXT | YES | 100.0% | Zip Code of the lender on the second mortgage. |
| 210 | `MORTGAGE2LENDERADDRESSZIP4` | TEXT | YES | 100.0% | Zip +4 of the lender on the second mortgage. |
| 211 | `MORTGAGE2LENDERINFOENTITYCLASSIFICATION` | TEXT | YES | 0.2% | Not Supported |
| 212 | `MORTGAGE2LENDERINFOSELLERCARRYBACKFLAG` | NUMBER | YES | 0.6% | An indicator whether a seller is the lender on this particular loan. |
| 213 | `MORTGAGE2TERM` | NUMBER | YES | 0.4% | The term/duration of the loan. Refer to Mortgage2TermType for the term unit |
| 214 | `MORTGAGE2TERMTYPE` | TEXT | YES | 0.1% | Indicates the term type (month, year) of the mortgage term indicated in Mortgage2Term |
| 215 | `MORTGAGE2TERMDATE` | DATE | YES | 0.1% | The date the loan represented on Mortgage2DocumentNumberFormatted is due. |
| 216 | `MORTGAGE2INFOPREPAYMENTPENALTYFLAG` | TEXT | YES | 0.0% | Flag to indicate if the loan terms includes pre-payment penalty. |
| 217 | `MORTGAGE2INFOPREPAYMENTTERM` | TEXT | YES | 100.0% | The number of months that the originated loan must remain active. If the loan is paid off early, the borrower will pay a prepayment penalty. Always expressed in months: 12, 18, 24, 36 are the most common. |
| 218 | `MORTGAGE2INTERESTRATETYPE` | TEXT | YES | 100.0% | When available will indicate the type of interest rate terms for the concurrent Deed of Trust. Left blank if unknown. |
| 219 | `MORTGAGE2INTERESTRATE` | NUMBER | YES | 0.4% | Interest rate for the loan related to Mortgage2DocumentNumber |
| 220 | `MORTGAGE2INTERESTTYPEINITIAL` | TEXT | YES | 100.0% | Indicates the initial state of the interest rate on the loan is fixed or adjustable. |
| 221 | `MORTGAGE2FIXEDSTEPCONVERSIONRATE` | TEXT | YES | 0.0% | The rate to which the interest will change in a fixed step conversion mortgage. |
| 222 | `MORTGAGE2DOCUMENTINFORIDERADJUSTABLERATEFLAG` | TEXT | YES | 0.0% | Flag to indicate if an adjustable rate rider was part of the document. |
| 223 | `MORTGAGE2INFOINTERESTTYPECHANGEYEAR` | NUMBER | YES | 0.0% | The year the loan converts from fixed rate to adjustable rate. Month and day of the conversion, if known, are housed in separate fields. |
| 224 | `MORTGAGE2INFOINTERESTTYPECHANGEMONTH` | NUMBER | YES | 0.0% | The month the loan converts from fixed rate to adjustable rate. Year and day of the conversion, if known, are housed in separate fields. |
| 225 | `MORTGAGE2INFOINTERESTTYPECHANGEDAY` | NUMBER | YES | 0.0% | The day of the month the loan converts from fixed rate to adjustable rate. Month and year of the conversion, if known, are housed in separate fields. |
| 226 | `MORTGAGE2INTERESTRATEMINFIRSTCHANGERATECONVERSION` | NUMBER | YES | 0.1% | Applies only to adjustable rate loans. The minimum interest rate allowed on the first change date (date when loan switched from a fixed to an adjustable interest rate) |
| 227 | `MORTGAGE2INTERESTRATEMAXFIRSTCHANGERATECONVERSION` | NUMBER | YES | 0.1% | Applies only to adjustable rate loans. The maximum interest rate allowed on the first change date (date when loan switched from a fixed to an adjustable interest rate) |
| 228 | `MORTGAGE2INTERESTCHANGEFREQUENCY` | TEXT | YES | 0.0% | The time defined between interest rate resets in an adjustable rate loan. |
| 229 | `MORTGAGE2INTERESTMARGIN` | NUMBER | YES | 0.1% | A fixed percentage rate that is added to an index value to determine the fully indexed interest rate of an adjustable rate mortgage. |
| 230 | `MORTGAGE2INTERESTINDEX` | NUMBER | YES | 19.5% | The benchmark interest rate an adjustable-rate mortgage's fully indexed interest rate is based on. |
| 231 | `MORTGAGE2INTERESTRATEMAX` | NUMBER | YES | 0.1% | Applies to adjustable rate loans. The maximum interest rate allowed for the loan. |
| 232 | `MORTGAGE2ADJUSTABLERATEINDEX` | TEXT | YES | 0.0% | The benchmark interest rate to which an adjustable rate mortgage is tied. |
| 233 | `MORTGAGE2INTERESTONLYFLAG` | NUMBER | YES | 0.0% | Flag to indicate if the loan has an interest only period. No longer supported. |
| 234 | `MORTGAGE2INTERESTONLYPERIOD` | TEXT | YES | 0.0% | If available, the actual length of interest only period in years. |
| 235 | `TRANSFERINFOPURCHASEDOWNPAYMENT` | NUMBER | YES | 100.0% | Derived field showing the estimated downpayment made at the time of purchase. |
| 236 | `TRANSFERINFOPURCHASELOANTOVALUE` | NUMBER | YES | 100.0% | Derived field showing the estimated loan to value at the time of purchase |
| 237 | `LASTUPDATED` | DATE | YES | 100.0% | Date on which this record was updated due to a correction within any of the fields and/or update to the same. |
| 238 | `PUBLICATIONDATE` | DATE | YES | 100.0% | Date the output data file was created |
| 239 | `DBCREATEDATE` | TIMESTAMP_NTZ | YES | 100.0% | DateTime when this Record was created on the current cloud platform |
| 240 | `DBUPDATEDATE` | TIMESTAMP_NTZ | YES | 100.0% | DateTime when this Record was last updated on the current cloud platform |
| 241 | `DBDELETEDATE` | TIMESTAMP_NTZ | YES | 0.0% | DateTime when this Record was soft deleted on the current cloud platform |

## 4. LOAN_MODEL — Full Column Inventory

_Schema columns: 44. Population sample: up to 5,000 storage rows (TX)._

| # | Column Name | Data Type | Nullable | % Populated | Comment |
|---|-------------|-----------|----------|-------------|---------|
| 1 | `ATTOMID` | NUMBER | NO | 100.0% | Unique parcel identifier.  |
| 2 | `SITUSSTATECODE` | TEXT | YES | 100.0% | USPS standard abbreviation for the state where the property is situated.  |
| 3 | `SITUSCOUNTY` | TEXT | YES | 100.0% | Name of county where the property is situated.  |
| 4 | `PROPERTYJURISDICTIONNAME` | TEXT | YES | 100.0% | Name of the tax jurisdiction. This is typically the county with some exceptions. Exceptions are primarily in the New England area where the townships are the taxing authorities.  |
| 5 | `SITUSSTATECOUNTYFIPS` | TEXT | YES | 100.0% | 5 digit numeric Federal Information Processing Standard (FIPS) code combining state and county codes where the property is located.  |
| 6 | `CURRENTFIRSTPOSITIONOPENLOANAMOUNT` | NUMBER | YES | 100.0% | Based on the ATTOM Data Solutions Loan Model algorithm, the original amount of the loan that is modelled to be in the first lien position.  |
| 7 | `CURRENTFIRSTPOSITIONOPENLOANDOCUMENTNUMBERFORMATTED` | TEXT | YES | 100.0% | Based on the ATTOM Data Solutions Loan Model algorithm, the recorded Document Number associated with the loan that is modelled to be in the first lien position.  |
| 8 | `CURRENTFIRSTPOSITIONOPENLOANRECORDINGDATE` | DATE | YES | 69.1% | Based on the ATTOM Data Solutions Loan Model algorithm, the recording date of the Document associated with the loan that is modelled to be in the first lien position.  |
| 9 | `CURRENTFIRSTPOSITIONOPENLOANTYPE` | TEXT | YES | 100.0% | Based on the ATTOM Data Solutions Loan Model algorithm, the type of loan (P - Purchase, R - Refinance, E-Equity) that was determined by the model for the loan in the first lien position.  |
| 10 | `CURRENTFIRSTPOSITIONOPENLOANLENDERNAMEFIRST` | TEXT | YES | 100.0% | Based on the ATTOM Data Solutions Loan Model algorithm, if the lender is a company, indicates the complete lender name for the loan represented by CurrentFirstPositionOpenLoanDocumentNumberFormatted field. If the lender is an individual, indicates the lender's first name for the loan represented by CurrentFirstPositionOpenLoanDocumentNumberFormatted field.  |
| 11 | `CURRENTFIRSTPOSITIONOPENLOANLENDERNAMELAST` | TEXT | YES | 100.0% | Based on the ATTOM Data Solutions Loan Model algorithm, if the lender is an individual, indicates the lender last name for the loan represented by CurrentFirstPositionOpenLoanDocumentNumberFormatted field.  |
| 12 | `CURRENTFIRSTPOSITIONOPENLOANLENDERINFOENTITYCLASSIFICATION` | TEXT | YES | 57.2% | Based on the ATTOM Data Solutions Loan Model algorithm, the lender type for the loan that was determined by the model for the loan in the first lien position..  |
| 13 | `CURRENTFIRSTPOSITIONOPENLOANINTERESTRATETYPE` | TEXT | YES | 100.0% | Based on the ATTOM Data Solutions Loan Model algorithm, when available will indicate the type of interest rate terms for the loan that was determined by the model for the loan in the first lien position. Left blank if unknown.  |
| 14 | `CURRENTFIRSTPOSITIONOPENLOANINTERESTRATE` | NUMBER | YES | 100.0% | Based on the ATTOM Data Solutions Loan Model algorithm, the interest rate for the loan that was determined by the model for the loan in the first lien position.  |
| 15 | `CURRENTFIRSTPOSITIONMORTGAGETYPE` | TEXT | YES | 34.2% | Based on the ATTOM Data Solutions Loan Model algorithm, indicates what type of loan; conventional, construction, HELOC, FHA, etc. for the loan that was determined by the model for the loan in the first lien position.  |
| 16 | `CURRENTFIRSTPOSITIONOPENLOANTRANSACTIONID` | NUMBER | YES | 100.0% | Internal ATTOM Data Solutions primary key value for the transaction containing the first modelled open loan.  |
| 17 | `CURRENTSECONDPOSITIONOPENLOANAMOUNT` | NUMBER | YES | 100.0% | Based on the ATTOM Data Solutions Loan Model algorithm, the original amount of the loan that is modelled to be in the second lien position.  |
| 18 | `CURRENTSECONDPOSITIONOPENLOANDOCUMENTNUMBERFORMATTED` | TEXT | YES | 100.0% | Based on the ATTOM Data Solutions Loan Model algorithm, the recorded Document Number associated with the loan that is modelled to be in the second lien position.  |
| 19 | `CURRENTSECONDPOSITIONOPENLOANRECORDINGDATE` | DATE | YES | 7.2% | Based on the ATTOM Data Solutions Loan Model algorithm, the recording date of the Document associated with the loan that is modelled to be in the second lien position.  |
| 20 | `CURRENTSECONDPOSITIONOPENLOANTYPE` | TEXT | YES | 100.0% | Based on the ATTOM Data Solutions Loan Model algorithm, the type of loan (P - Purchase, R - Refinance, E-Equity) that was determined by the model for the loan in the second lien position.  |
| 21 | `CURRENTSECONDPOSITIONOPENLOANLENDERNAMEFIRST` | TEXT | YES | 100.0% | Based on the ATTOM Data Solutions Loan Model algorithm, if the lender is a company, indicates the complete lender name for the loan represented by CurrentSecondPositionOpenLoanDocumentNumberFormatted field. If the lender is an individual, indicates the lender's first name for the loan represented by CurrentSecondPositionOpenLoanDocumentNumberFormatted field.  |
| 22 | `CURRENTSECONDPOSITIONOPENLOANLENDERNAMELAST` | TEXT | YES | 100.0% | Based on the ATTOM Data Solutions Loan Model algorithm, if the lender is an individual, indicates the lender last name for the loan represented by CurrentSecondPositionOpenLoanDocumentNumberFormatted field.  |
| 23 | `CURRENTSECONDPOSITIONOPENLOANLENDERINFOENTITYCLASSIFICATION` | TEXT | YES | 6.6% | Based on the ATTOM Data Solutions Loan Model algorithm, the lender type for the loan that was determined by the model for the loan in the second lien position..  |
| 24 | `CURRENTSECONDPOSITIONOPENLOANINTERESTRATETYPE` | TEXT | YES | 100.0% | Based on the ATTOM Data Solutions Loan Model algorithm, when available will indicate the type of interest rate terms for the loan that was determined by the model for the loan in the second lien position. Left blank if unknown.  |
| 25 | `CURRENTSECONDPOSITIONOPENLOANINTERESTRATE` | NUMBER | YES | 100.0% | Based on the ATTOM Data Solutions Loan Model algorithm, the interest rate for the loan that was determined by the model for the loan in the second lien position.  |
| 26 | `CURRENTSECONDPOSITIONMORTGAGETYPE` | TEXT | YES | 4.6% | Based on the ATTOM Data Solutions Loan Model algorithm, indicates what type of loan; conventional, construction, HELOC, FHA, etc. for the loan that was determined by the model for the loan in the second lien position.  |
| 27 | `CURRENTSECONDPOSITIONOPENLOANTRANSACTIONID` | NUMBER | YES | 100.0% | Internal ATTOM Data Solutions primary key value for the transaction containing the second modelled open loan.  |
| 28 | `CURRENTTHIRDPOSITIONOPENLOANAMOUNT` | NUMBER | YES | 100.0% | Based on the ATTOM Data Solutions Loan Model algorithm, the original amount of the loan that is modelled to be in the third lien position.  |
| 29 | `CURRENTTHIRDPOSITIONOPENLOANDOCUMENTNUMBERFORMATTED` | TEXT | YES | 100.0% | Based on the ATTOM Data Solutions Loan Model algorithm, the recorded Document Number associated with the loan that is modelled to be in the third lien position.  |
| 30 | `CURRENTTHIRDPOSITIONOPENLOANRECORDINGDATE` | DATE | YES | 0.0% | Based on the ATTOM Data Solutions Loan Model algorithm, the recording date of the Document associated with the loan that is modelled to be in the third lien position.  |
| 31 | `CURRENTTHIRDPOSITIONOPENLOANTYPE` | TEXT | YES | 100.0% | Based on the ATTOM Data Solutions Loan Model algorithm, the type of loan (P - Purchase, R - Refinance, E-Equity) that was determined by the model for the loan in the third lien position.  |
| 32 | `CURRENTTHIRDPOSITIONOPENLOANLENDERNAMEFIRST` | TEXT | YES | 100.0% | Based on the ATTOM Data Solutions Loan Model algorithm, if the lender is a company, indicates the complete lender name for the loan represented by CurrentThirdPositionOpenLoanDocumentNumberFormatted field. If the lender is an individual, indicates the lender's first name for the loan represented by CurrentThirdPositionOpenLoanDocumentNumberFormatted field.  |
| 33 | `CURRENTTHIRDPOSITIONOPENLOANLENDERNAMELAST` | TEXT | YES | 100.0% | Based on the ATTOM Data Solutions Loan Model algorithm, if the lender is an individual, indicates the lender last name for the loan represented by CurrentThirdPositionOpenLoanDocumentNumberFormatted field.  |
| 34 | `CURRENTTHIRDPOSITIONOPENLOANLENDERINFOENTITYCLASSIFICATION` | TEXT | YES | 0.0% | Based on the ATTOM Data Solutions Loan Model algorithm, the lender type for the loan that was determined by the model for the loan in the third lien position..  |
| 35 | `CURRENTTHIRDPOSITIONOPENLOANINTERESTRATETYPE` | TEXT | YES | 100.0% | Based on the ATTOM Data Solutions Loan Model algorithm, when available will indicate the type of interest rate terms for the loan that was determined by the model for the loan in the third lien position. Left blank if unknown.  |
| 36 | `CURRENTTHIRDPOSITIONOPENLOANINTERESTRATE` | NUMBER | YES | 100.0% | Based on the ATTOM Data Solutions Loan Model algorithm, the interest rate for the loan that was determined by the model for the loan in the third lien position.  |
| 37 | `CURRENTTHIRDPOSITIONMORTGAGETYPE` | TEXT | YES | 0.0% | Based on the ATTOM Data Solutions Loan Model algorithm, indicates what type of loan; conventional, construction, HELOC, FHA, etc. for the loan that was determined by the model for the loan in the third lien position.  |
| 38 | `CURRENTTHIRDPOSITIONOPENLOANTRANSACTIONID` | NUMBER | YES | 100.0% | Internal ATTOM Data Solutions primary key value for the transaction containing the third modelled open loan.  |
| 39 | `LTV` | NUMBER | YES | 0.0% | Loan To Value calculated by dividing the sum of currently open loan amounts by the AVM value for the property  |
| 40 | `AVAILABLEEQUITY` | NUMBER | YES | 0.0% | The difference between the current market value represented by the AVM value and the sum of the current outstanding loan amounts.  |
| 41 | `LENDABLEEQUITY` | NUMBER | YES | 0.0% | 80% of the difference between the current market value represented by the AVM value and the sum of the current outstanding loan amounts.  |
| 42 | `PUBLICATIONDATE` | DATE | YES | 100.0% | Date the output data file was published  |
| 43 | `DBCREATEDATE` | TIMESTAMP_NTZ | YES | 100.0% | DateTime when this Record was created on the current cloud platform |
| 44 | `DBUPDATEDATE` | TIMESTAMP_NTZ | YES | 100.0% | DateTime when this Record was last updated on the current cloud platform |

## 5. PREFORECLOSURE — Full Column Inventory

_Schema columns: 105. Population sample: up to 5,000 storage rows (TX)._

| # | Column Name | Data Type | Nullable | % Populated | Comment |
|---|-------------|-----------|----------|-------------|---------|
| 1 | `TRANSACTIONID` | NUMBER | NO | 100.0% | The unique transaction identifier for the transaction.  |
| 2 | `ATTOMID` | NUMBER | NO | 100.0% | ATTOM Data's Unique parcel identifier.  |
| 3 | `RECORDTYPE` | TEXT | YES | 100.0% | Type of Default Document  |
| 4 | `SITUSSTATECODE` | TEXT | YES | 100.0% | State where the property is situated.  |
| 5 | `SITUSCOUNTY` | TEXT | YES | 100.0% | County where the property is situated.  |
| 6 | `PROPERTYJURISDICTIONNAME` | TEXT | YES | 100.0% | Name of the tax jurisdiction. This is typically the county with some exceptions. Exceptions are primarily in the New England area where the townships are the taxing authorities.  |
| 7 | `SITUSSTATECOUNTYFIPS` | TEXT | YES | 100.0% | State and county FIPS code where subject property is geographically located.  |
| 8 | `PARCELNUMBERFORMATTED` | TEXT | YES | 100.0% | Primary Parcel Number and unique identifier within the county/jurisdiction  |
| 9 | `PROPERTYADDRESSFULL` | TEXT | YES | 100.0% | 123 1/2 N Main St - Full site address line.  |
| 10 | `PROPERTYADDRESSHOUSENUMBER` | TEXT | YES | 100.0% | 123 1/2 N Main St - Site address house number and fraction.  |
| 11 | `PROPERTYADDRESSSTREETDIRECTION` | TEXT | YES | 100.0% | 123 1/2 N Main St - Site address pre directional.  |
| 12 | `PROPERTYADDRESSSTREETNAME` | TEXT | YES | 100.0% | 123 1/2 N Main St - Site address street name.  |
| 13 | `PROPERTYADDRESSSTREETSUFFIX` | TEXT | YES | 100.0% | 123 1/2 N Main St - Site address street name suffix.  |
| 14 | `PROPERTYADDRESSSTREETPOSTDIRECTION` | TEXT | YES | 100.0% | 100 Center NW Pl., Unit 4a - Site address post-directional.  |
| 15 | `PROPERTYADDRESSUNITPREFIX` | TEXT | YES | 100.0% | 100 Center NW Pl., Unit 4a - Site address unit number Prefix.  |
| 16 | `PROPERTYADDRESSUNITVALUE` | TEXT | YES | 100.0% | 100 Center NW Pl., Unit 4a - Site address unit number.  |
| 17 | `PROPERTYADDRESSCITY` | TEXT | YES | 100.0% | Anytown CA 90001-0001 CR0523 - Site address city name.  |
| 18 | `PROPERTYADDRESSSTATE` | TEXT | YES | 100.0% | Anytown CA 90001-0001 CR0523 - Site address state.  |
| 19 | `PROPERTYADDRESSZIP` | TEXT | YES | 100.0% | Anytown CA 90001-0001 CR0523 - Site address Zip Code.  |
| 20 | `PROPERTYADDRESSZIP4` | TEXT | YES | 100.0% | Anytown CA 90001-0001 CR0523 - Site address Zip Plus 4 code.  |
| 21 | `PROPERTYADDRESSCRRT` | TEXT | YES | 100.0% | Anytown CA 90001-0001 CR0523 - Site address Carrier Route.  |
| 22 | `PROPERTYADDRESSINFOPRIVACY` | TEXT | YES | 0.0% | Indicator of whether is a legal restriction on the property address being used for marketing.  |
| 23 | `PROPERTYLATITUDE` | FLOAT | YES | 100.0% | Latitude based on Situs Address.  |
| 24 | `PROPERTYLONGITUDE` | FLOAT | YES | 100.0% | Longitude based on Situs Address.  |
| 25 | `GEOQUALITY` | TEXT | YES | 100.0% | Code to indicate the level of quality of the geocodes as determined by the geocoding process.  |
| 26 | `ZONEDCODELOCAL` | TEXT | YES | 100.0% | The jurisdiction-specific zoned use value. Typically codified by the controlling jurisdiction.  |
| 27 | `PROPERTYUSEMUNI` | TEXT | YES | 100.0% | County-specific use code which is used to map the PropertyUseStandardized field.  |
| 28 | `PROPERTYUSEGROUP` | TEXT | YES | 100.0% | General property type description; residential, commercial, other, etc.  |
| 29 | `PROPERTYUSESTANDARDIZED` | TEXT | YES | 100.0% | Standardized value to describe the property's intended land use. Derived from specific land use information obtained from the Assessor.  |
| 30 | `BATHCOUNT` | NUMBER | YES | 100.0% | Sum of bathrooms on the property.  |
| 31 | `BEDROOMSCOUNT` | NUMBER | YES | 100.0% | Sum of bedrooms on the property.  |
| 32 | `AREABUILDING` | NUMBER | YES | 100.0% | Total / Gross building square footage.  |
| 33 | `AREABUILDINGDEFINITIONCODE` | TEXT | YES | 100.0% | Details the area described by the AreaBuilding value.  |
| 34 | `AREALOTSF` | NUMBER | YES | 100.0% | Indicates the lot size, in square feet.  |
| 35 | `AREALOTACRES` | NUMBER | YES | 100.0% | Indicates the lot size, in acres.  |
| 36 | `YEARBUILT` | NUMBER | YES | 97.2% | Year built of the primary structure.  |
| 37 | `YEARBUILTEFFECTIVE` | NUMBER | YES | 8.3% | Adjusted year built based on condition and / or major structural changes of the structure.  |
| 38 | `ORIGINALLOANRECORDINGDATE` | DATE | YES | 25.0% | Contains the official filing date for the original loan transaction that is normally stamped or printed on the document in YYYY-MM-DD format.  |
| 39 | `ORIGINALLOANINSTRUMENTNUMBER` | TEXT | YES | 63.9% | recorder's Instrument Number of the original loan document.  |
| 40 | `ORIGINALLOANBOOKPAGE` | TEXT | YES | 50.0% | Book and page of the original loan document.  |
| 41 | `BORROWERNAMEOWNER` | TEXT | YES | 100.0% | Mortgagee, concatenated name(s) of borrower in default.  |
| 42 | `ORIGINALLOANLOANNUMBER` | TEXT | YES | 69.4% | Original loan account number of loan in default; or 'HOA' will found for HOA preforeclosure notice; or 'MUN' to represent a municipality foreclosure  |
| 43 | `ORIGINALLOANAMOUNT` | NUMBER | YES | 100.0% | Original amount of loan in default.  |
| 44 | `ORIGINALLOANINTERESTRATE` | NUMBER | YES | 0.0% | Interest rate of the original loan in default.  |
| 45 | `LOANMATURITYDATE` | DATE | YES | 11.1% | Maturity date of loan in default in YYYY-MM-DD format.  |
| 46 | `LENDERNAMEFULLSTANDARDIZED` | TEXT | YES | 91.7% | Full lender name, standardized to manage abbreviations, remove misspelling, etc. Partner field to Lender code. Can be used for lender matching.  |
| 47 | `LENDERADDRESS` | TEXT | YES | 61.1% | 123 1/2 N Main St - Lender's Full site address line.  |
| 48 | `LENDERADDRESSHOUSENUMBER` | TEXT | YES | 33.3% | 123 1/2 N Main St - Lender's Site address house number and fraction.  |
| 49 | `LENDERADDRESSSTREETDIRECTION` | TEXT | YES | 33.3% | 123 1/2 N Main St - Lender's Site address pre directional.  |
| 50 | `LENDERADDRESSSTREETNAME` | TEXT | YES | 33.3% | 123 1/2 N Main St - Lender's Site address street name.  |
| 51 | `LENDERADDRESSSTREETSUFFIX` | TEXT | YES | 33.3% | 123 1/2 N Main St - Lender's Site address street name suffix.  |
| 52 | `LENDERADDRESSSTREETPOSTDIRECTION` | TEXT | YES | 33.3% | 100 Center NW Pl., 4a - Lender's Site address post-directional.  |
| 53 | `LENDERADDRESSUNITVALUE` | TEXT | YES | 33.3% | 100 Center NW Pl., 4a - Lender's Site address unit number.  |
| 54 | `LENDERADDRESSCITY` | TEXT | YES | 61.1% | Anytown CA 90001-0001 - Lender's Site address city name.  |
| 55 | `LENDERADDRESSSTATE` | TEXT | YES | 61.1% | Anytown CA 90001-0001 - Lender's Site address state.  |
| 56 | `LENDERADDRESSZIP` | TEXT | YES | 61.1% | Anytown CA 90001-0001 - Lender's Site address Zip Code.  |
| 57 | `LENDERPHONE` | TEXT | YES | 47.2% | Phone number of the lender.  |
| 58 | `SERVICERNAME` | TEXT | YES | 72.2% | Name of the entity providing servicing for the loan.  |
| 59 | `SERVICERADDRESS` | TEXT | YES | 97.2% | Address of the entity providing servicing for the loan.  |
| 60 | `SERVICERCITY` | TEXT | YES | 72.2% | City of the entity providing servicing for the loan.  |
| 61 | `SERVICERSTATE` | TEXT | YES | 72.2% | State of the entity providing servicing for the loan.  |
| 62 | `SERVICERZIP` | TEXT | YES | 72.2% | Zip code of the entity providing servicing for the loan.  |
| 63 | `SERVICERPHONE` | TEXT | YES | 63.9% | Phone number of the entity providing servicing for the loan.  |
| 64 | `TRUSTEENAME` | TEXT | YES | 100.0% | Trustee or attorney handling the foreclosure event.  |
| 65 | `TRUSTEEADDRESS` | TEXT | YES | 88.9% | 123 1/2 N Main St - Trustee's Full address line.  |
| 66 | `TRUSTEEADDRESSHOUSENUMBER` | TEXT | YES | 33.3% | 123 1/2 N Main St - Trustee's address house number and fraction.  |
| 67 | `TRUSTEEADDRESSSTREETDIRECTION` | TEXT | YES | 33.3% | 123 1/2 N Main St - Trustee's address pre directional.  |
| 68 | `TRUSTEEADDRESSSTREETNAME` | TEXT | YES | 33.3% | 123 1/2 N Main St - Trustee's address street name.  |
| 69 | `TRUSTEEADDRESSSTREETSUFFIX` | TEXT | YES | 33.3% | 123 1/2 N Main St - Trustee's address street name suffix.  |
| 70 | `TRUSTEEADDRESSSTREETPOSTDIRECTION` | TEXT | YES | 33.3% | 100 Center NW Pl., 4a - Trustee's address post-directional.  |
| 71 | `TRUSTEEADDRESSUNITVALUE` | TEXT | YES | 33.3% | 100 Center NW Pl., 4a - Trustee's address unit number.  |
| 72 | `TRUSTEEADDRESSCITY` | TEXT | YES | 91.7% | Anytown CA 90001-0001 - Trustee's address city name.  |
| 73 | `TRUSTEEADDRESSSTATE` | TEXT | YES | 91.7% | Anytown CA 90001-0001 - Trustee's address state.  |
| 74 | `TRUSTEEADDRESSZIP` | TEXT | YES | 88.9% | Anytown CA 90001-0001 - Trustee's address Zip Code.  |
| 75 | `TRUSTEEPHONE` | TEXT | YES | 58.3% | Trustee's phone number.  |
| 76 | `FORECLOSUREINSTRUMENTDATE` | DATE | YES | 0.0% | Creation / Signature date on the instrument. Format YYYY-MM-DD. Not to be confused with the recording date.  |
| 77 | `FORECLOSURERECORDINGDATE` | DATE | YES | 100.0% | Date on which the instrument was officially recorded at the county. Format YYYY-MM-DD.  |
| 78 | `FORECLOSUREINSTRUMENTNUMBER` | TEXT | YES | 58.3% | Document number on the instrument.  |
| 79 | `FORECLOSUREBOOKPAGE` | TEXT | YES | 44.4% | Book and page on the instrument.  |
| 80 | `CASENUMBER` | TEXT | YES | 63.9% | A unique identifier established by the court in a judicial foreclosure proceeding. It is important to note that this is not a document level identifier, rather it is case level. A case consists of many documents. Thus, to match future documents regarding a case, for example, associating a release or dismissal of the foreclosure complaint, the case number must be matched.  |
| 81 | `TRUSTEEREFERENCENUMBER` | TEXT | YES | 97.2% | Unique number assigned by the trustee to track status of foreclosure and auction proceedings.  |
| 82 | `PAYMENT` | NUMBER | YES | 0.0% | Regular monthly payment from related mortgage document  |
| 83 | `DEFAULTAMOUNT` | NUMBER | YES | 100.0% | Default amount noted on the instrument.  |
| 84 | `PENALTYINTEREST` | NUMBER | YES | 0.0% | Amount of penalty interest accrued.  |
| 85 | `LOANBALANCE` | NUMBER | YES | 5.6% | Remaining balance on defaulted loan.  |
| 86 | `JUDGMENTDATE` | DATE | YES | 0.0% | Date of final judgment if a lis pendens case in YYYY-MM-DD format.  |
| 87 | `JUDGMENTAMOUNT` | NUMBER | YES | 100.0% | Amount of final judgment, including fees and interest.  |
| 88 | `COURTHOUSE` | TEXT | YES | 44.4% | Name or description of courthouse hosting the public auction.  |
| 89 | `AUCTIONADDRESS` | TEXT | YES | 100.0% | Full unparsed address where the foreclosure auction is to be held.  |
| 90 | `AUCTIONHOUSENUMBER` | TEXT | YES | 33.3% | The house number and fraction of the location of the foreclosure auction.  |
| 91 | `AUCTIONDIRECTION` | TEXT | YES | 33.3% | The pre directional of the location of the foreclosure auction.  |
| 92 | `AUCTIONSTREETNAME` | TEXT | YES | 33.3% | The street name of the location of the foreclosure auction.  |
| 93 | `AUCTIONSUFFIX` | TEXT | YES | 33.3% | The street name suffix of the location of the foreclosure auction.  |
| 94 | `AUCTIONPOSTDIRECTION` | TEXT | YES | 33.3% | The post-directional of the location of the foreclosure auction.  |
| 95 | `AUCTIONUNIT` | TEXT | YES | 33.3% | The unit number of the location of the foreclosure auction.  |
| 96 | `AUCTIONCITY` | TEXT | YES | 100.0% | The city name of the location of the foreclosure auction.  |
| 97 | `AUCTIONDATE` | DATE | YES | 50.0% | Date of the foreclosure auction in YYYY-MM-DD format.  |
| 98 | `AUCTIONTIME` | TEXT | YES | 100.0% | The start time of the foreclosure auction.  |
| 99 | `RECORDEDAUCTIONOPENINGBID` | NUMBER | YES | 50.0% | Anticipated Opening Bid at the scheduled auction  |
| 100 | `ESTIMATEDVALUE` | NUMBER | YES | 0.0% | Estimated value based on ATTOMData's Valuation Model as of the CreateDate below.  |
| 101 | `CREATEDATE` | DATE | YES | 100.0% | Date the record was first created in YYYY-MM-DD format.  |
| 102 | `RECORDLASTUPDATED` | TIMESTAMP_NTZ | YES | 100.0% | The last update date for the record in YYYY-MM-DD format.  |
| 103 | `PUBLICATIONDATE` | DATE | YES | 100.0% | The date on which the client's data file was extracted and delivered. Not to be associated with a county's publication,fiilng, or posted date.  |
| 104 | `DBCREATEDATE` | TIMESTAMP_NTZ | YES | 100.0% | DateTime when this Record was created on the current cloud platform |
| 105 | `DBUPDATEDATE` | TIMESTAMP_NTZ | YES | 100.0% | DateTime when this Record was last updated on the current cloud platform |

---
## 6. Critical Column Presence Check

### TAX_ASSESSOR

| Expected Column | Status | Notes |
|----------------|--------|-------|
| `PROPERTYUSESTANDARDIZED` | ✅ FOUND | |
| `ATTOMID` | ✅ FOUND | |
| `STATECOUNTYFIPS` | ✅ FOUND AS | actual column: `SITUSSTATECOUNTYFIPS` (TEXT, 100% populated) |
| `OWNER1FIRSTNAME` | ✅ FOUND AS | actual column: `PARTYOWNER1NAMEFIRST` (TEXT, 56.5% populated) |
| `OWNER1LASTNAME` | ✅ FOUND AS | actual column: `PARTYOWNER1NAMELAST` (TEXT, 99.9% populated) |
| `OWNER1FULLNAME` | ✅ FOUND AS | actual column: `PARTYOWNER1NAMEFULL` (TEXT, 100% populated) |
| `OWNER1CORPORATEINDICATOR` | ✅ FOUND AS | actual column: `COMPANYFLAG` (TEXT, 100%) + `OWNERTYPEDESCRIPTION1` (TEXT, 89.2%) |
| `COMPANYFLAG` | ✅ FOUND | |
| `TRUSTDESCRIPTION` | ✅ FOUND | |
| `PROPERTYADDRESSFULL` | ✅ FOUND | |
| `PROPERTYADDRESSCITY` | ✅ FOUND | |
| `PROPERTYADDRESSSTATE` | ✅ FOUND | |
| `PROPERTYADDRESSZIP` | ✅ FOUND | |
| `STORAGEBUILDINGFLAG` | ✅ FOUND | |
| `STORAGEBUILDINGAREA` | ✅ FOUND | 2.9% populated — most storage parcels don't have this broken out |
| `YEARBUILT` | ✅ FOUND | |
| `LOTSIZESQFT` | ✅ FOUND AS | actual column: `AREALOTSF` (NUMBER, 100% populated) |
| `BUILDINGAREATOTAL` | ✅ FOUND AS | actual column: `AREABUILDING` (NUMBER, 100% populated) — "Total area sq ft of all structures" |
| `CURRENTSALERECORDINGDATE` | ✅ FOUND AS | actual column: `ASSESSORLASTSALEDATE` (DATE, 80.6%) or `DEEDLASTSALEDATE` (DATE, 80.5%) |
| `CURRENTSALESPRICEAMOUNT` | ✅ FOUND AS | actual column: `ASSESSORLASTSALEAMOUNT` (NUMBER, 91.4%) or `DEEDLASTSALEPRICE` (NUMBER, 91.4%) |
| `TAXASSESSEDVALUETOTAL` | ✅ FOUND | |
| `TAXMARKETVALUETOTAL` | ✅ FOUND | |
| `TAXYEARASSESSED` | ✅ FOUND | |

### RECORDER

| Expected Column | Status | Notes |
|----------------|--------|-------|
| `ATTOMID` | ✅ FOUND | |
| `RECORDINGDATE` | ✅ FOUND | 60.4% populated |
| `TRANSFERDATE` | ✅ FOUND AS | actual column: `INSTRUMENTDATE` (DATE, 81.8% populated) — date parties executed document |
| `SALEDATE` | ✅ FOUND AS | actual column: `INSTRUMENTDATE` (same as transfer date in ATTOM model) |
| `DOCUMENTTYPE` | ✅ FOUND AS | actual column: `DOCUMENTTYPECODE` (TEXT, 100% populated) |
| `DEEDCATEGORY` | ✅ FOUND AS | actual column: `DOCUMENTTYPECODE` — no separate deed category; use `QUITCLAIMFLAG` + `FORECLOSUREAUCTIONSALE` + `ARMSLENGTHFLAG` |
| `SALESPRICE` | ✅ FOUND AS | actual column: `TRANSFERAMOUNT` (NUMBER, 60.4% populated) |
| `SALESPRICEAMOUNT` | ✅ FOUND AS | actual column: `TRANSFERAMOUNT` (same field) |
| `BUYER1FULLNAME` | ✅ FOUND AS | actual column: `GRANTEE1NAMEFULL` (TEXT, 100% populated) |
| `SELLER1FULLNAME` | ✅ FOUND AS | actual column: `GRANTOR1NAMEFULL` (TEXT, 100% populated) |
| `GRANTEENAME` | ✅ FOUND AS | actual column: `GRANTEE1NAMEFULL` (TEXT, 100% populated) |
| `GRANTORNAME` | ✅ FOUND AS | actual column: `GRANTOR1NAMEFULL` (TEXT, 100% populated) |
| `GRANTEEINVESTORFLAG` | ✅ FOUND | |
| `QUITCLAIMFLAG` | ✅ FOUND | |
| `MORTGAGEAMOUNT` | ✅ FOUND AS | actual column: `MORTGAGE1AMOUNT` (NUMBER, NUMERIC 18,2) |
| `MORTGAGETERM` | ✅ FOUND AS | actual column: `MORTGAGE1TERM` (NUMBER) |
| `MORTGAGEINTERESTRATE` | ✅ FOUND AS | actual column: `MORTGAGE1INTERESTRATE` (NUMBER, NUMERIC 18,2) |
| `LENDERFULLNAME` | ✅ FOUND AS | actual column: `MORTGAGE1LENDERNAMEFULLSTANDARDIZED` (TEXT) |

### LOAN_MODEL

| Expected Column | Status | Notes |
|----------------|--------|-------|
| `ATTOMID` | ✅ FOUND | |
| `LOANID` | ❌ MISSING | No discrete loan ID — LOAN_MODEL is a property-level summary of open positions (1st/2nd/3rd lien). Use `CURRENTFIRSTPOSITIONOPENLOANTRANSACTIONID` as proxy. |
| `LOANAMOUNT` | ✅ FOUND AS | actual column: `CURRENTFIRSTPOSITIONOPENLOANAMOUNT` (NUMERIC 18,2) — also 2nd/3rd position available |
| `ORIGINATIONDATE` | ✅ FOUND AS | actual column: `CURRENTFIRSTPOSITIONOPENLOANRECORDINGDATE` (DATE) |
| `MATURITYDATE` | ❌ MISSING | Not in LOAN_MODEL — available in PREFORECLOSURE as `LOANMATURITYDATE` |
| `INTERESTRATE` | ✅ FOUND AS | actual column: `CURRENTFIRSTPOSITIONOPENLOANINTERESTRATE` (NUMERIC 18,2) |
| `LOANTYPE` | ✅ FOUND AS | actual column: `CURRENTFIRSTPOSITIONOPENLOANTYPE` (TEXT) |
| `LENDERFULLNAME` | ✅ FOUND AS | actual column: `CURRENTFIRSTPOSITIONOPENLOANLENDERNAMEFIRST` + `CURRENTFIRSTPOSITIONOPENLOANLENDERNAMELAST` (concatenate) |

### PREFORECLOSURE

| Expected Column | Status | Notes |
|----------------|--------|-------|
| `ATTOMID` | ✅ FOUND | |
| `FILINGDATE` | ✅ FOUND AS | actual column: `FORECLOSUREINSTRUMENTDATE` (DATE) or `FORECLOSURERECORDINGDATE` (DATE) |
| `AUCTIONDATE` | ✅ FOUND | |
| `CASESTATUS` | ✅ FOUND AS | actual column: `RECORDTYPE` (TEXT) — indicates NOD, NTS, LIS, REO, etc. |
| `FORECLOSURETYPE` | ✅ FOUND AS | actual column: `RECORDTYPE` (TEXT) — same field encodes both status and type |
| `ORIGINALLOANAMOUNT` | ✅ FOUND | |
| `DEFAULTAMOUNT` | ✅ FOUND | |

---
## 7. Join Key Analysis

### ATTOMID presence

| View | ATTOMID Present | Notes |
|------|----------------|-------|
| TAX_ASSESSOR | ✅ Yes | Primary join key |
| RECORDER | ✅ Yes | Primary join key |
| LOAN_MODEL | ✅ Yes | Primary join key |
| PREFORECLOSURE | ✅ Yes | Primary join key |

### ATTOMID overlap with TAX_ASSESSOR storage set (TX, PROPERTYUSESTANDARDIZED='229')

| View | Storage ATTOMIDs in TAX_ASSESSOR | With Match in This View | Coverage % |
|------|----------------------------------|-------------------------|------------|
| TAX_ASSESSOR | 4,719 | 4,719 | 100.0% |
| RECORDER | 4,719 | 3,499 | 74.1% |
| LOAN_MODEL | 4,719 | 152 | 3.2% |
| PREFORECLOSURE | 4,719 | 26 | 0.6% |

---
## 8. Recommendations for Neon DDL

Columns with < 5% population are flagged as candidates for exclusion.

### TAX_ASSESSOR

| Column | Snowflake Type | Suggested PG Type | Action |
|--------|---------------|-------------------|--------|
| `ATTOMID` | NUMBER | `BIGINT` | INCLUDE |
| `SITUSSTATECODE` | TEXT | `TEXT` | INCLUDE |
| `SITUSCOUNTY` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYJURISDICTIONNAME` | TEXT | `TEXT` | INCLUDE |
| `SITUSSTATECOUNTYFIPS` | TEXT | `TEXT` | INCLUDE |
| `COMBINEDSTATISTICALAREA` | TEXT | `TEXT` | INCLUDE |
| `CBSANAME` | TEXT | `TEXT` | INCLUDE |
| `CBSACODE` | TEXT | `TEXT` | INCLUDE |
| `MSANAME` | TEXT | `TEXT` | INCLUDE |
| `MSACODE` | TEXT | `TEXT` | INCLUDE |
| `METROPOLITANDIVISION` | TEXT | `TEXT` | INCLUDE |
| `MINORCIVILDIVISIONNAME` | TEXT | `TEXT` | INCLUDE |
| `MINORCIVILDIVISIONCODE` | TEXT | `TEXT` | INCLUDE |
| `NEIGHBORHOODCODE` | TEXT | `TEXT` | INCLUDE |
| `CENSUSFIPSPLACECODE` | TEXT | `TEXT` | INCLUDE |
| `CENSUSTRACT` | NUMBER | `BIGINT` | INCLUDE |
| `CENSUSBLOCKGROUP` | NUMBER | `BIGINT` | INCLUDE |
| `CENSUSBLOCK` | NUMBER | `BIGINT` | INCLUDE |
| `PARCELNUMBERRAW` | TEXT | `TEXT` | INCLUDE |
| `PARCELNUMBERFORMATTED` | TEXT | `TEXT` | INCLUDE |
| `PARCELNUMBERYEARADDED` | NUMBER | `INTEGER` | INCLUDE |
| `PARCELNUMBERALTERNATE` | TEXT | `TEXT` | INCLUDE |
| `PARCELMAPBOOK` | TEXT | `TEXT` | INCLUDE |
| `PARCELMAPPAGE` | TEXT | `TEXT` | INCLUDE |
| `PARCELNUMBERYEARCHANGE` | NUMBER | `INTEGER` | INCLUDE |
| `PARCELNUMBERPREVIOUS` | TEXT | `TEXT` | INCLUDE |
| `PARCELACCOUNTNUMBER` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYADDRESSFULL` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYADDRESSHOUSENUMBER` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYADDRESSSTREETDIRECTION` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYADDRESSSTREETNAME` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYADDRESSSTREETSUFFIX` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYADDRESSSTREETPOSTDIRECTION` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYADDRESSUNITPREFIX` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYADDRESSUNITVALUE` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYADDRESSCITY` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYADDRESSSTATE` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYADDRESSZIP` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYADDRESSZIP4` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYADDRESSCRRT` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYADDRESSINFOPRIVACY` | NUMBER | `BIGINT` | INCLUDE |
| `CONGRESSIONALDISTRICTHOUSE` | NUMBER | `BIGINT` | INCLUDE |
| `LATITUDE` | FLOAT | `NUMERIC(18,6)` | INCLUDE |
| `LONGITUDE` | FLOAT | `NUMERIC(18,6)` | INCLUDE |
| `GEOQUALITYCODE` | TEXT | `TEXT` | INCLUDE |
| `LEGALDESCRIPTION` | TEXT | `TEXT` | INCLUDE |
| `LEGALRANGE` | TEXT | `TEXT` | INCLUDE |
| `LEGALTOWNSHIP` | TEXT | `TEXT` | INCLUDE |
| `LEGALSECTION` | TEXT | `TEXT` | INCLUDE |
| `LEGALQUARTER` | TEXT | `TEXT` | INCLUDE |
| `LEGALQUARTERQUARTER` | TEXT | `TEXT` | INCLUDE |
| `LEGALSUBDIVISION` | TEXT | `TEXT` | INCLUDE |
| `LEGALPHASE` | TEXT | `TEXT` | INCLUDE |
| `LEGALTRACTNUMBER` | TEXT | `TEXT` | INCLUDE |
| `LEGALBLOCK1` | TEXT | `TEXT` | INCLUDE |
| `LEGALBLOCK2` | TEXT | `TEXT` | INCLUDE |
| `LEGALLOTNUMBER1` | TEXT | `TEXT` | INCLUDE |
| `LEGALLOTNUMBER2` | TEXT | `TEXT` | INCLUDE |
| `LEGALLOTNUMBER3` | TEXT | `TEXT` | INCLUDE |
| `LEGALUNIT` | TEXT | `TEXT` | INCLUDE |
| `PARTYOWNER1NAMEFULL` | TEXT | `TEXT` | INCLUDE |
| `PARTYOWNER1NAMEFIRST` | TEXT | `TEXT` | INCLUDE |
| `PARTYOWNER1NAMEMIDDLE` | TEXT | `TEXT` | INCLUDE |
| `PARTYOWNER1NAMELAST` | TEXT | `TEXT` | INCLUDE |
| `PARTYOWNER1NAMESUFFIX` | TEXT | `TEXT` | INCLUDE |
| `TRUSTDESCRIPTION` | TEXT | `TEXT` | INCLUDE |
| `COMPANYFLAG` | TEXT | `TEXT` | INCLUDE |
| `PARTYOWNER2NAMEFULL` | TEXT | `TEXT` | INCLUDE |
| `PARTYOWNER2NAMEFIRST` | TEXT | `TEXT` | INCLUDE |
| `PARTYOWNER2NAMEMIDDLE` | TEXT | `TEXT` | INCLUDE |
| `PARTYOWNER2NAMELAST` | TEXT | `TEXT` | INCLUDE |
| `PARTYOWNER2NAMESUFFIX` | TEXT | `TEXT` | INCLUDE |
| `OWNERTYPEDESCRIPTION1` | TEXT | `TEXT` | INCLUDE |
| `OWNERSHIPVESTINGRELATIONCODE` | TEXT | `TEXT` | INCLUDE |
| `PARTYOWNER3NAMEFULL` | TEXT | `TEXT` | INCLUDE |
| `PARTYOWNER3NAMEFIRST` | TEXT | `TEXT` | INCLUDE |
| `PARTYOWNER3NAMEMIDDLE` | TEXT | `TEXT` | INCLUDE |
| `PARTYOWNER3NAMELAST` | TEXT | `TEXT` | INCLUDE |
| `PARTYOWNER3NAMESUFFIX` | TEXT | `TEXT` | INCLUDE |
| `PARTYOWNER4NAMEFULL` | TEXT | `TEXT` | INCLUDE |
| `PARTYOWNER4NAMEFIRST` | TEXT | `TEXT` | INCLUDE |
| `PARTYOWNER4NAMEMIDDLE` | TEXT | `TEXT` | INCLUDE |
| `PARTYOWNER4NAMELAST` | TEXT | `TEXT` | INCLUDE |
| `PARTYOWNER4NAMESUFFIX` | TEXT | `TEXT` | INCLUDE |
| `OWNERTYPEDESCRIPTION2` | TEXT | `TEXT` | INCLUDE |
| `CONTACTOWNERMAILINGCOUNTY` | TEXT | `TEXT` | INCLUDE |
| `CONTACTOWNERMAILINGFIPS` | TEXT | `TEXT` | INCLUDE |
| `CONTACTOWNERMAILADDRESSFULL` | TEXT | `TEXT` | INCLUDE |
| `CONTACTOWNERMAILADDRESSHOUSENUMBER` | TEXT | `TEXT` | INCLUDE |
| `CONTACTOWNERMAILADDRESSSTREETDIRECTION` | TEXT | `TEXT` | INCLUDE |
| `CONTACTOWNERMAILADDRESSSTREETNAME` | TEXT | `TEXT` | INCLUDE |
| `CONTACTOWNERMAILADDRESSSTREETSUFFIX` | TEXT | `TEXT` | INCLUDE |
| `CONTACTOWNERMAILADDRESSSTREETPOSTDIRECTION` | TEXT | `TEXT` | INCLUDE |
| `CONTACTOWNERMAILADDRESSUNITPREFIX` | TEXT | `TEXT` | INCLUDE |
| `CONTACTOWNERMAILADDRESSUNIT` | TEXT | `TEXT` | INCLUDE |
| `CONTACTOWNERMAILADDRESSCITY` | TEXT | `TEXT` | INCLUDE |
| `CONTACTOWNERMAILADDRESSSTATE` | TEXT | `TEXT` | INCLUDE |
| `CONTACTOWNERMAILADDRESSZIP` | TEXT | `TEXT` | INCLUDE |
| `CONTACTOWNERMAILADDRESSZIP4` | TEXT | `TEXT` | INCLUDE |
| `CONTACTOWNERMAILADDRESSCRRT` | TEXT | `TEXT` | INCLUDE |
| `CONTACTOWNERMAILADDRESSINFOFORMAT` | TEXT | `TEXT` | INCLUDE |
| `CONTACTOWNERMAILINFOPRIVACY` | TEXT | `TEXT` | INCLUDE |
| `STATUSOWNEROCCUPIEDFLAG` | TEXT | `TEXT` | INCLUDE |
| `DEEDOWNER1NAMEFULL` | TEXT | `TEXT` | INCLUDE |
| `DEEDOWNER1NAMEFIRST` | TEXT | `TEXT` | INCLUDE |
| `DEEDOWNER1NAMEMIDDLE` | TEXT | `TEXT` | INCLUDE |
| `DEEDOWNER1NAMELAST` | TEXT | `TEXT` | INCLUDE |
| `DEEDOWNER1NAMESUFFIX` | TEXT | `TEXT` | INCLUDE |
| `DEEDOWNER2NAMEFULL` | TEXT | `TEXT` | INCLUDE |
| `DEEDOWNER2NAMEFIRST` | TEXT | `TEXT` | INCLUDE |
| `DEEDOWNER2NAMEMIDDLE` | TEXT | `TEXT` | INCLUDE |
| `DEEDOWNER2NAMELAST` | TEXT | `TEXT` | INCLUDE |
| `DEEDOWNER2NAMESUFFIX` | TEXT | `TEXT` | INCLUDE |
| `DEEDOWNER3NAMEFULL` | TEXT | `TEXT` | INCLUDE |
| `DEEDOWNER3NAMEFIRST` | TEXT | `TEXT` | INCLUDE |
| `DEEDOWNER3NAMEMIDDLE` | TEXT | `TEXT` | INCLUDE |
| `DEEDOWNER3NAMELAST` | TEXT | `TEXT` | INCLUDE |
| `DEEDOWNER3NAMESUFFIX` | TEXT | `TEXT` | INCLUDE |
| `DEEDOWNER4NAMEFULL` | TEXT | `TEXT` | INCLUDE |
| `DEEDOWNER4NAMEFIRST` | TEXT | `TEXT` | INCLUDE |
| `DEEDOWNER4NAMEMIDDLE` | TEXT | `TEXT` | INCLUDE |
| `DEEDOWNER4NAMELAST` | TEXT | `TEXT` | INCLUDE |
| `DEEDOWNER4NAMESUFFIX` | TEXT | `TEXT` | INCLUDE |
| `TAXYEARASSESSED` | NUMBER | `INTEGER` | INCLUDE |
| `TAXASSESSEDVALUETOTAL` | NUMBER | `NUMERIC(18,2)` | INCLUDE |
| `TAXASSESSEDVALUEIMPROVEMENTS` | NUMBER | `NUMERIC(18,2)` | INCLUDE |
| `TAXASSESSEDVALUELAND` | NUMBER | `NUMERIC(18,2)` | INCLUDE |
| `TAXASSESSEDIMPROVEMENTSPERC` | NUMBER | `BIGINT` | INCLUDE |
| `PREVIOUSASSESSEDVALUE` | NUMBER | `NUMERIC(18,2)` | INCLUDE |
| `TAXMARKETVALUEYEAR` | NUMBER | `NUMERIC(18,2)` | INCLUDE |
| `TAXMARKETVALUETOTAL` | NUMBER | `NUMERIC(18,2)` | INCLUDE |
| `TAXMARKETVALUEIMPROVEMENTS` | NUMBER | `NUMERIC(18,2)` | INCLUDE |
| `TAXMARKETVALUELAND` | NUMBER | `NUMERIC(18,2)` | INCLUDE |
| `TAXMARKETIMPROVEMENTSPERC` | NUMBER | `BIGINT` | INCLUDE |
| `TAXFISCALYEAR` | NUMBER | `INTEGER` | INCLUDE |
| `TAXRATEAREA` | TEXT | `TEXT` | INCLUDE |
| `TAXBILLEDAMOUNT` | NUMBER | `NUMERIC(18,2)` | INCLUDE |
| `TAXDELINQUENTYEAR` | NUMBER | `INTEGER` | INCLUDE |
| `LASTASSESSORTAXROLLUPDATE` | DATE | `DATE` | INCLUDE |
| `ASSRLASTUPDATED` | DATE | `DATE` | INCLUDE |
| `TAXEXEMPTIONHOMEOWNERFLAG` | TEXT | `TEXT` | INCLUDE |
| `TAXEXEMPTIONDISABLEDFLAG` | TEXT | `TEXT` | INCLUDE |
| `TAXEXEMPTIONSENIORFLAG` | TEXT | `TEXT` | INCLUDE |
| `TAXEXEMPTIONVETERANFLAG` | TEXT | `TEXT` | INCLUDE |
| `TAXEXEMPTIONWIDOWFLAG` | TEXT | `TEXT` | INCLUDE |
| `TAXEXEMPTIONADDITIONAL` | TEXT | `TEXT` | INCLUDE |
| `YEARBUILT` | NUMBER | `INTEGER` | INCLUDE |
| `YEARBUILTEFFECTIVE` | NUMBER | `INTEGER` | INCLUDE |
| `ZONEDCODELOCAL` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYUSEMUNI` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYUSEGROUP` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYUSESTANDARDIZED` | TEXT | `TEXT` | INCLUDE |
| `ASSESSORLASTSALEDATE` | DATE | `DATE` | INCLUDE |
| `ASSESSORLASTSALEAMOUNT` | NUMBER | `NUMERIC(18,2)` | INCLUDE |
| `ASSESSORPRIORSALEDATE` | DATE | `DATE` | INCLUDE |
| `ASSESSORPRIORSALEAMOUNT` | NUMBER | `NUMERIC(18,2)` | INCLUDE |
| `LASTOWNERSHIPTRANSFERDATE` | DATE | `DATE` | INCLUDE |
| `LASTOWNERSHIPTRANSFERDOCUMENTNUMBER` | TEXT | `TEXT` | INCLUDE |
| `LASTOWNERSHIPTRANSFERTRANSACTIONID` | NUMBER | `BIGINT` | INCLUDE |
| `DEEDLASTSALEDOCUMENTBOOK` | TEXT | `TEXT` | INCLUDE |
| `DEEDLASTSALEDOCUMENTPAGE` | TEXT | `TEXT` | INCLUDE |
| `DEEDLASTDOCUMENTNUMBER` | TEXT | `TEXT` | INCLUDE |
| `DEEDLASTSALEDATE` | DATE | `DATE` | INCLUDE |
| `DEEDLASTSALEPRICE` | NUMBER | `NUMERIC(18,2)` | INCLUDE |
| `DEEDLASTSALETRANSACTIONID` | NUMBER | `BIGINT` | INCLUDE |
| `AREABUILDING` | NUMBER | `BIGINT` | INCLUDE |
| `AREABUILDINGDEFINITIONCODE` | TEXT | `TEXT` | INCLUDE |
| `AREAGROSS` | NUMBER | `BIGINT` | INCLUDE |
| `AREA1STFLOOR` | NUMBER | `BIGINT` | INCLUDE |
| `AREA2NDFLOOR` | NUMBER | `BIGINT` | INCLUDE |
| `AREAUPPERFLOORS` | NUMBER | `BIGINT` | INCLUDE |
| `AREALOTACRES` | NUMBER | `BIGINT` | INCLUDE |
| `AREALOTSF` | NUMBER | `BIGINT` | INCLUDE |
| `AREALOTDEPTH` | NUMBER | `BIGINT` | INCLUDE |
| `AREALOTWIDTH` | NUMBER | `BIGINT` | INCLUDE |
| `ROOMSATTICAREA` | NUMBER | `BIGINT` | INCLUDE |
| `ROOMSATTICFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `ROOMSBASEMENTAREA` | NUMBER | `BIGINT` | INCLUDE |
| `ROOMSBASEMENTAREAFINISHED` | NUMBER | `BIGINT` | INCLUDE |
| `ROOMSBASEMENTAREAUNFINISHED` | NUMBER | `BIGINT` | INCLUDE |
| `PARKINGGARAGE` | TEXT | `TEXT` | INCLUDE |
| `PARKINGGARAGEAREA` | NUMBER | `BIGINT` | INCLUDE |
| `PARKINGCARPORT` | TEXT | `TEXT` | INCLUDE |
| `PARKINGCARPORTAREA` | NUMBER | `BIGINT` | INCLUDE |
| `HVACCOOLINGDETAIL` | TEXT | `TEXT` | INCLUDE |
| `HVACHEATINGDETAIL` | TEXT | `TEXT` | INCLUDE |
| `HVACHEATINGFUEL` | TEXT | `TEXT` | INCLUDE |
| `UTILITIESSEWAGEUSAGE` | TEXT | `TEXT` | INCLUDE |
| `UTILITIESWATERSOURCE` | TEXT | `TEXT` | INCLUDE |
| `UTILITIESMOBILEHOMEHOOKUPFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `FOUNDATION` | TEXT | `TEXT` | INCLUDE |
| `CONSTRUCTION` | TEXT | `TEXT` | INCLUDE |
| `INTERIORSTRUCTURE` | TEXT | `TEXT` | INCLUDE |
| `PLUMBINGFIXTURESCOUNT` | NUMBER | `INTEGER` | INCLUDE |
| `CONSTRUCTIONFIRERESISTANCECLASS` | TEXT | `TEXT` | INCLUDE |
| `SAFETYFIRESPRINKLERSFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `FLOORINGMATERIALPRIMARY` | NUMBER | `BIGINT` | INCLUDE |
| `BATHCOUNT` | NUMBER | `INTEGER` | INCLUDE |
| `BATHPARTIALCOUNT` | NUMBER | `INTEGER` | INCLUDE |
| `BEDROOMSCOUNT` | NUMBER | `INTEGER` | INCLUDE |
| `ROOMSCOUNT` | NUMBER | `INTEGER` | INCLUDE |
| `STORIESCOUNT` | NUMBER | `INTEGER` | INCLUDE |
| `UNITSCOUNT` | NUMBER | `INTEGER` | INCLUDE |
| `ROOMSBONUSROOMFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `ROOMSBREAKFASTNOOKFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `ROOMSCELLARFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `ROOMSCELLARWINEFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `ROOMSEXERCISEFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `ROOMSFAMILYCODE` | TEXT | `TEXT` | INCLUDE |
| `ROOMSGAMEFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `ROOMSGREATFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `ROOMSHOBBYFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `ROOMSLAUNDRYFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `ROOMSMEDIAFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `ROOMSMUDFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `ROOMSOFFICEAREA` | NUMBER | `BIGINT` | INCLUDE |
| `ROOMSOFFICEFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `ROOMSSAFEROOMFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `ROOMSSITTINGFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `ROOMSSTORMSHELTER` | NUMBER | `BIGINT` | INCLUDE |
| `ROOMSSTUDYFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `ROOMSSUNROOMFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `ROOMSUTILITYAREA` | NUMBER | `BIGINT` | INCLUDE |
| `ROOMSUTILITYCODE` | TEXT | `TEXT` | INCLUDE |
| `FIREPLACE` | TEXT | `TEXT` | INCLUDE |
| `FIREPLACECOUNT` | NUMBER | `INTEGER` | INCLUDE |
| `ACCESSIBILITYELEVATORFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `ACCESSIBILITYHANDICAPFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `ESCALATORFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `CENTRALVACUUMFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `CONTENTINTERCOMFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `CONTENTSOUNDSYSTEMFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `WETBARFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `SECURITYALARMFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `STRUCTURESTYLE` | NUMBER | `BIGINT` | INCLUDE |
| `EXTERIOR1CODE` | TEXT | `TEXT` | INCLUDE |
| `ROOFMATERIAL` | TEXT | `TEXT` | INCLUDE |
| `ROOFCONSTRUCTION` | TEXT | `TEXT` | INCLUDE |
| `CONTENTSTORMSHUTTERFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `CONTENTOVERHEADDOORFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `VIEWDESCRIPTION` | TEXT | `TEXT` | INCLUDE |
| `PORCHCODE` | TEXT | `TEXT` | INCLUDE |
| `PORCHAREA` | NUMBER | `BIGINT` | INCLUDE |
| `PATIOAREA` | NUMBER | `BIGINT` | INCLUDE |
| `DECKFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `DECKAREA` | NUMBER | `BIGINT` | INCLUDE |
| `FEATUREBALCONYFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `BALCONYAREA` | NUMBER | `BIGINT` | INCLUDE |
| `BREEZEWAYFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `PARKINGRVPARKINGFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `PARKINGSPACECOUNT` | NUMBER | `INTEGER` | INCLUDE |
| `DRIVEWAYAREA` | NUMBER | `BIGINT` | INCLUDE |
| `DRIVEWAYMATERIAL` | TEXT | `TEXT` | INCLUDE |
| `POOL` | NUMBER | `BIGINT` | INCLUDE |
| `POOLAREA` | NUMBER | `BIGINT` | INCLUDE |
| `CONTENTSAUNAFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `TOPOGRAPHYCODE` | NUMBER | `BIGINT` | INCLUDE |
| `FENCECODE` | TEXT | `TEXT` | INCLUDE |
| `FENCEAREA` | NUMBER | `BIGINT` | INCLUDE |
| `COURTYARDFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `COURTYARDAREA` | NUMBER | `BIGINT` | INCLUDE |
| `ARBORPERGOLAFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `SPRINKLERSFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `GOLFCOURSEGREENFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `TENNISCOURTFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `SPORTSCOURTFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `ARENAFLAG` | TEXT | `TEXT` | INCLUDE |
| `WATERFEATUREFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `PONDFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `BOATLIFTFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `BUILDINGSCOUNT` | NUMBER | `INTEGER` | INCLUDE |
| `BATHHOUSEAREA` | NUMBER | `BIGINT` | INCLUDE |
| `BATHHOUSEFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `BOATACCESSFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `BOATHOUSEAREA` | NUMBER | `BIGINT` | INCLUDE |
| `BOATHOUSEFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `CABINAREA` | NUMBER | `BIGINT` | INCLUDE |
| `CABINFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `CANOPYAREA` | NUMBER | `BIGINT` | INCLUDE |
| `CANOPYFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `GAZEBOAREA` | NUMBER | `BIGINT` | INCLUDE |
| `GAZEBOFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `GRAINERYAREA` | NUMBER | `BIGINT` | INCLUDE |
| `GRAINERYFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `GREENHOUSEAREA` | NUMBER | `BIGINT` | INCLUDE |
| `GREENHOUSEFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `GUESTHOUSEAREA` | NUMBER | `BIGINT` | INCLUDE |
| `GUESTHOUSEFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `KENNELAREA` | NUMBER | `BIGINT` | INCLUDE |
| `KENNELFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `LEANTOAREA` | NUMBER | `BIGINT` | INCLUDE |
| `LEANTOFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `LOADINGPLATFORMAREA` | NUMBER | `BIGINT` | INCLUDE |
| `LOADINGPLATFORMFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `MILKHOUSEAREA` | NUMBER | `BIGINT` | INCLUDE |
| `MILKHOUSEFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `OUTDOORKITCHENFIREPLACEFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `POOLHOUSEAREA` | NUMBER | `BIGINT` | INCLUDE |
| `POOLHOUSEFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `POULTRYHOUSEAREA` | NUMBER | `BIGINT` | INCLUDE |
| `POULTRYHOUSEFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `QUONSETAREA` | NUMBER | `BIGINT` | INCLUDE |
| `QUONSETFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `SHEDAREA` | NUMBER | `BIGINT` | INCLUDE |
| `SHEDCODE` | TEXT | `TEXT` | INCLUDE |
| `SILOAREA` | NUMBER | `BIGINT` | INCLUDE |
| `SILOFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `STABLEAREA` | NUMBER | `BIGINT` | INCLUDE |
| `STABLEFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `STORAGEBUILDINGAREA` | NUMBER | `BIGINT` | INCLUDE |
| `STORAGEBUILDINGFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `UTILITYBUILDINGAREA` | NUMBER | `BIGINT` | INCLUDE |
| `UTILITYBUILDINGFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `POLESTRUCTUREAREA` | NUMBER | `BIGINT` | INCLUDE |
| `POLESTRUCTUREFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `COMMUNITYRECROOMFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `PUBLICATIONDATE` | DATE | `DATE` | INCLUDE |
| `PARCELSHELLRECORD` | NUMBER | `BIGINT` | INCLUDE |
| `DBCREATEDATE` | TIMESTAMP_NTZ | `TIMESTAMPTZ` | INCLUDE |
| `DBUPDATEDATE` | TIMESTAMP_NTZ | `TIMESTAMPTZ` | INCLUDE |
| `DBDELETEDATE` | TIMESTAMP_NTZ | `TIMESTAMPTZ` | INCLUDE |

### RECORDER

| Column | Snowflake Type | Suggested PG Type | Action |
|--------|---------------|-------------------|--------|
| `TRANSACTIONID` | NUMBER | `BIGINT` | INCLUDE |
| `ATTOMID` | NUMBER | `BIGINT` | INCLUDE |
| `DOCUMENTRECORDINGSTATECODE` | TEXT | `TEXT` | INCLUDE |
| `DOCUMENTRECORDINGCOUNTYNAME` | TEXT | `TEXT` | INCLUDE |
| `DOCUMENTRECORDINGJURISDICTIONNAME` | TEXT | `TEXT` | INCLUDE |
| `DOCUMENTRECORDINGCOUNTYFIPS` | TEXT | `TEXT` | INCLUDE |
| `DOCUMENTTYPECODE` | TEXT | `TEXT` | INCLUDE |
| `DOCUMENTNUMBERFORMATTED` | TEXT | `TEXT` | INCLUDE |
| `DOCUMENTNUMBERLEGACY` | TEXT | `TEXT` | INCLUDE |
| `INSTRUMENTNUMBER` | TEXT | `TEXT` | INCLUDE |
| `BOOK` | TEXT | `TEXT` | INCLUDE |
| `PAGE` | TEXT | `TEXT` | INCLUDE |
| `INSTRUMENTDATE` | DATE | `DATE` | INCLUDE |
| `RECORDINGDATE` | DATE | `DATE` | INCLUDE |
| `TRANSACTIONTYPE` | TEXT | `TEXT` | INCLUDE |
| `TRANSFERINFOPURCHASETYPECODE` | NUMBER | `BIGINT` | INCLUDE |
| `FORECLOSUREAUCTIONSALE` | NUMBER | `BIGINT` | INCLUDE |
| `TRANSFERINFODISTRESSCIRCUMSTANCECODE` | NUMBER | `BIGINT` | INCLUDE |
| `QUITCLAIMFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `TRANSFERINFOMULTIPARCELFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `ARMSLENGTHFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `PARTIALINTEREST` | TEXT | `TEXT` | INCLUDE |
| `TRANSFERAMOUNT` | NUMBER | `NUMERIC(18,2)` | INCLUDE |
| `TRANSFERAMOUNTINFOACCURACY` | TEXT | `TEXT` | INCLUDE |
| `TRANSFERTAXTOTAL` | NUMBER | `BIGINT` | INCLUDE |
| `TRANSFERTAXCITY` | NUMBER | `BIGINT` | INCLUDE |
| `TRANSFERTAXCOUNTY` | NUMBER | `INTEGER` | INCLUDE |
| `GRANTOR1NAMEFULL` | TEXT | `TEXT` | INCLUDE |
| `GRANTOR1NAMEFIRST` | TEXT | `TEXT` | INCLUDE |
| `GRANTOR1NAMEMIDDLE` | TEXT | `TEXT` | INCLUDE |
| `GRANTOR1NAMELAST` | TEXT | `TEXT` | INCLUDE |
| `GRANTOR1NAMESUFFIX` | TEXT | `TEXT` | INCLUDE |
| `GRANTOR1INFOENTITYCLASSIFICATION` | TEXT | `TEXT` | INCLUDE |
| `GRANTOR1INFOOWNERTYPE` | TEXT | `TEXT` | INCLUDE |
| `GRANTOR2NAMEFULL` | TEXT | `TEXT` | INCLUDE |
| `GRANTOR2NAMEFIRST` | TEXT | `TEXT` | INCLUDE |
| `GRANTOR2NAMEMIDDLE` | TEXT | `TEXT` | INCLUDE |
| `GRANTOR2NAMELAST` | TEXT | `TEXT` | INCLUDE |
| `GRANTOR2NAMESUFFIX` | TEXT | `TEXT` | INCLUDE |
| `GRANTOR2INFOENTITYCLASSIFICATION` | TEXT | `TEXT` | INCLUDE |
| `GRANTOR2INFOOWNERTYPE` | TEXT | `TEXT` | INCLUDE |
| `GRANTOR3NAMEFULL` | TEXT | `TEXT` | INCLUDE |
| `GRANTOR3NAMEFIRST` | TEXT | `TEXT` | INCLUDE |
| `GRANTOR3NAMEMIDDLE` | TEXT | `TEXT` | INCLUDE |
| `GRANTOR3NAMELAST` | TEXT | `TEXT` | INCLUDE |
| `GRANTOR3NAMESUFFIX` | TEXT | `TEXT` | INCLUDE |
| `GRANTOR3INFOENTITYCLASSIFICATION` | TEXT | `TEXT` | INCLUDE |
| `GRANTOR4NAMEFULL` | TEXT | `TEXT` | INCLUDE |
| `GRANTOR4NAMEFIRST` | TEXT | `TEXT` | INCLUDE |
| `GRANTOR4NAMEMIDDLE` | TEXT | `TEXT` | INCLUDE |
| `GRANTOR4NAMELAST` | TEXT | `TEXT` | INCLUDE |
| `GRANTOR4NAMESUFFIX` | TEXT | `TEXT` | INCLUDE |
| `GRANTOR4INFOENTITYCLASSIFICATION` | TEXT | `TEXT` | INCLUDE |
| `GRANTORADDRESSFULL` | TEXT | `TEXT` | INCLUDE |
| `GRANTORADDRESSHOUSENUMBER` | TEXT | `TEXT` | INCLUDE |
| `GRANTORADDRESSSTREETDIRECTION` | TEXT | `TEXT` | INCLUDE |
| `GRANTORADDRESSSTREETNAME` | TEXT | `TEXT` | INCLUDE |
| `GRANTORADDRESSSTREETSUFFIX` | TEXT | `TEXT` | INCLUDE |
| `GRANTORADDRESSSTREETPOSTDIRECTION` | TEXT | `TEXT` | INCLUDE |
| `GRANTORADDRESSUNITPREFIX` | TEXT | `TEXT` | INCLUDE |
| `GRANTORADDRESSUNITVALUE` | TEXT | `TEXT` | INCLUDE |
| `GRANTORADDRESSCITY` | TEXT | `TEXT` | INCLUDE |
| `GRANTORADDRESSSTATE` | TEXT | `TEXT` | INCLUDE |
| `GRANTORADDRESSZIP` | TEXT | `TEXT` | INCLUDE |
| `GRANTORADDRESSZIP4` | TEXT | `TEXT` | INCLUDE |
| `GRANTORADDRESSCRRT` | TEXT | `TEXT` | INCLUDE |
| `GRANTORADDRESSINFOFORMAT` | TEXT | `TEXT` | INCLUDE |
| `GRANTORADDRESSINFOPRIVACY` | NUMBER | `BIGINT` | INCLUDE |
| `GRANTEE1NAMEFULL` | TEXT | `TEXT` | INCLUDE |
| `GRANTEE1NAMEFIRST` | TEXT | `TEXT` | INCLUDE |
| `GRANTEE1NAMEMIDDLE` | TEXT | `TEXT` | INCLUDE |
| `GRANTEE1NAMELAST` | TEXT | `TEXT` | INCLUDE |
| `GRANTEE1NAMESUFFIX` | TEXT | `TEXT` | INCLUDE |
| `GRANTEE1INFOENTITYCLASSIFICATION` | TEXT | `TEXT` | INCLUDE |
| `GRANTEE1INFOOWNERTYPE` | TEXT | `TEXT` | INCLUDE |
| `GRANTEE2NAMEFULL` | TEXT | `TEXT` | INCLUDE |
| `GRANTEE2NAMEFIRST` | TEXT | `TEXT` | INCLUDE |
| `GRANTEE2NAMEMIDDLE` | TEXT | `TEXT` | INCLUDE |
| `GRANTEE2NAMELAST` | TEXT | `TEXT` | INCLUDE |
| `GRANTEE2NAMESUFFIX` | TEXT | `TEXT` | INCLUDE |
| `GRANTEE2INFOENTITYCLASSIFICATION` | TEXT | `TEXT` | INCLUDE |
| `GRANTEEINFOVESTING1` | TEXT | `TEXT` | INCLUDE |
| `GRANTEE3NAMEFULL` | TEXT | `TEXT` | INCLUDE |
| `GRANTEE3NAMEFIRST` | TEXT | `TEXT` | INCLUDE |
| `GRANTEE3NAMEMIDDLE` | TEXT | `TEXT` | INCLUDE |
| `GRANTEE3NAMELAST` | TEXT | `TEXT` | INCLUDE |
| `GRANTEE3NAMESUFFIX` | TEXT | `TEXT` | INCLUDE |
| `GRANTEE3INFOENTITYCLASSIFICATION` | TEXT | `TEXT` | INCLUDE |
| `GRANTEE4NAMEFULL` | TEXT | `TEXT` | INCLUDE |
| `GRANTEE4NAMEFIRST` | TEXT | `TEXT` | INCLUDE |
| `GRANTEE4NAMEMIDDLE` | TEXT | `TEXT` | INCLUDE |
| `GRANTEE4NAMELAST` | TEXT | `TEXT` | INCLUDE |
| `GRANTEE4NAMESUFFIX` | TEXT | `TEXT` | INCLUDE |
| `GRANTEE4INFOENTITYCLASSIFICATION` | TEXT | `TEXT` | INCLUDE |
| `GRANTEEMAILCAREOFNAME` | TEXT | `TEXT` | INCLUDE |
| `GRANTEEINFOENTITYCOUNT` | NUMBER | `INTEGER` | INCLUDE |
| `GRANTEEINFOVESTING2` | TEXT | `TEXT` | INCLUDE |
| `GRANTEEINVESTORFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `GRANTEEMAILADDRESSFULL` | TEXT | `TEXT` | INCLUDE |
| `GRANTEEMAILADDRESSHOUSENUMBER` | TEXT | `TEXT` | INCLUDE |
| `GRANTEEMAILADDRESSSTREETDIRECTION` | TEXT | `TEXT` | INCLUDE |
| `GRANTEEMAILADDRESSSTREETNAME` | TEXT | `TEXT` | INCLUDE |
| `GRANTEEMAILADDRESSSTREETSUFFIX` | TEXT | `TEXT` | INCLUDE |
| `GRANTEEMAILADDRESSSTREETPOSTDIRECTION` | TEXT | `TEXT` | INCLUDE |
| `GRANTEEMAILADDRESSUNITPREFIX` | TEXT | `TEXT` | INCLUDE |
| `GRANTEEMAILADDRESSUNITVALUE` | TEXT | `TEXT` | INCLUDE |
| `GRANTEEMAILADDRESSCITY` | TEXT | `TEXT` | INCLUDE |
| `GRANTEEMAILADDRESSSTATE` | TEXT | `TEXT` | INCLUDE |
| `GRANTEEMAILADDRESSZIP` | TEXT | `TEXT` | INCLUDE |
| `GRANTEEMAILADDRESSZIP4` | TEXT | `TEXT` | INCLUDE |
| `GRANTEEMAILADDRESSCRRT` | TEXT | `TEXT` | INCLUDE |
| `GRANTEEMAILADDRESSINFOFORMAT` | TEXT | `TEXT` | INCLUDE |
| `GRANTEEMAILADDRESSINFOPRIVACY` | NUMBER | `BIGINT` | INCLUDE |
| `GRANTEEGRANTOROWNERRELATIONSHIPCODE` | TEXT | `TEXT` | INCLUDE |
| `TITLECOMPANYSTANDARDIZEDCODE` | TEXT | `TEXT` | INCLUDE |
| `TITLECOMPANYSTANDARDIZEDNAME` | TEXT | `TEXT` | INCLUDE |
| `TITLECOMPANYRAW` | TEXT | `TEXT` | INCLUDE |
| `LEGALDESCRIPTIONPART1` | TEXT | `TEXT` | INCLUDE |
| `LEGALDESCRIPTIONPART2` | TEXT | `TEXT` | INCLUDE |
| `LEGALDESCRIPTIONPART3` | TEXT | `TEXT` | INCLUDE |
| `LEGALDESCRIPTIONPART4` | TEXT | `TEXT` | INCLUDE |
| `LEGALRANGE` | TEXT | `TEXT` | INCLUDE |
| `LEGALTOWNSHIP` | TEXT | `TEXT` | INCLUDE |
| `LEGALSECTION` | TEXT | `TEXT` | INCLUDE |
| `LEGALDISTRICT` | TEXT | `TEXT` | INCLUDE |
| `LEGALSUBDIVISION` | TEXT | `TEXT` | INCLUDE |
| `LEGALTRACT` | TEXT | `TEXT` | INCLUDE |
| `LEGALBLOCK` | TEXT | `TEXT` | INCLUDE |
| `LEGALLOT` | TEXT | `TEXT` | INCLUDE |
| `LEGALUNIT` | TEXT | `TEXT` | INCLUDE |
| `LEGALPLATMAPBOOK` | TEXT | `TEXT` | INCLUDE |
| `LEGALPLATMAPPAGE` | TEXT | `TEXT` | INCLUDE |
| `APNFORMATTED` | TEXT | `TEXT` | INCLUDE |
| `APNORIGINAL` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYADDRESSFULL` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYADDRESSHOUSENUMBER` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYADDRESSSTREETDIRECTION` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYADDRESSSTREETNAME` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYADDRESSSTREETSUFFIX` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYADDRESSSTREETPOSTDIRECTION` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYADDRESSUNITPREFIX` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYADDRESSUNITVALUE` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYADDRESSCITY` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYADDRESSSTATE` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYADDRESSZIP` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYADDRESSZIP4` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYADDRESSCRRT` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYADDRESSINFOFORMAT` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYADDRESSINFOPRIVACY` | NUMBER | `BIGINT` | INCLUDE |
| `RECORDERMAPREFERENCE` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYUSEGROUP` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYUSESTANDARDIZED` | TEXT | `TEXT` | INCLUDE |
| `MORTGAGE1DOCUMENTNUMBERFORMATTED` | TEXT | `TEXT` | INCLUDE |
| `MORTGAGE1DOCUMENTNUMBERLEGACY` | TEXT | `TEXT` | INCLUDE |
| `MORTGAGE1INSTRUMENTNUMBER` | TEXT | `TEXT` | INCLUDE |
| `MORTGAGE1BOOK` | TEXT | `TEXT` | INCLUDE |
| `MORTGAGE1PAGE` | TEXT | `TEXT` | INCLUDE |
| `MORTGAGE1RECORDINGDATE` | DATE | `DATE` | INCLUDE |
| `MORTGAGE1TYPE` | TEXT | `TEXT` | INCLUDE |
| `MORTGAGE1AMOUNT` | NUMBER | `NUMERIC(18,2)` | INCLUDE |
| `MORTGAGE1LENDERCODE` | NUMBER | `BIGINT` | INCLUDE |
| `MORTGAGE1LENDERNAMEFULLSTANDARDIZED` | TEXT | `TEXT` | INCLUDE |
| `MORTGAGE1LENDERNAMEFIRST` | TEXT | `TEXT` | INCLUDE |
| `MORTGAGE1LENDERNAMELAST` | TEXT | `TEXT` | INCLUDE |
| `MORTGAGE1LENDERADDRESS` | TEXT | `TEXT` | INCLUDE |
| `MORTGAGE1LENDERADDRESSCITY` | TEXT | `TEXT` | INCLUDE |
| `MORTGAGE1LENDERADDRESSSTATE` | TEXT | `TEXT` | INCLUDE |
| `MORTGAGE1LENDERADDRESSZIP` | TEXT | `TEXT` | INCLUDE |
| `MORTGAGE1LENDERADDRESSZIP4` | TEXT | `TEXT` | INCLUDE |
| `MORTGAGE1LENDERINFOENTITYCLASSIFICATION` | TEXT | `TEXT` | INCLUDE |
| `MORTGAGE1LENDERINFOSELLERCARRYBACKFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `MORTGAGE1TERM` | NUMBER | `BIGINT` | INCLUDE |
| `MORTGAGE1TERMTYPE` | TEXT | `TEXT` | INCLUDE |
| `MORTGAGE1TERMDATE` | DATE | `DATE` | INCLUDE |
| `MORTGAGE1INFOPREPAYMENTPENALTYFLAG` | TEXT | `TEXT` | INCLUDE |
| `MORTGAGE1INFOPREPAYMENTTERM` | TEXT | `TEXT` | INCLUDE |
| `MORTGAGE1INTERESTRATETYPE` | TEXT | `TEXT` | INCLUDE |
| `MORTGAGE1INTERESTRATE` | NUMBER | `NUMERIC(18,2)` | INCLUDE |
| `MORTGAGE1INTERESTTYPEINITIAL` | TEXT | `TEXT` | INCLUDE |
| `MORTGAGE1FIXEDSTEPCONVERSIONRATE` | TEXT | `TEXT` | INCLUDE |
| `MORTGAGE1DOCUMENTINFORIDERADJUSTABLERATEFLAG` | TEXT | `TEXT` | INCLUDE |
| `MORTGAGE1INFOINTERESTTYPECHANGEYEAR` | NUMBER | `INTEGER` | INCLUDE |
| `MORTGAGE1INFOINTERESTTYPECHANGEMONTH` | NUMBER | `BIGINT` | INCLUDE |
| `MORTGAGE1INFOINTERESTTYPECHANGEDAY` | NUMBER | `BIGINT` | INCLUDE |
| `MORTGAGE1INTERESTRATEMINFIRSTCHANGERATECONVERSION` | NUMBER | `NUMERIC(18,2)` | INCLUDE |
| `MORTGAGE1INTERESTRATEMAXFIRSTCHANGERATECONVERSION` | NUMBER | `NUMERIC(18,2)` | INCLUDE |
| `MORTGAGE1INTERESTCHANGEFREQUENCY` | TEXT | `TEXT` | INCLUDE |
| `MORTGAGE1INTERESTMARGIN` | NUMBER | `BIGINT` | INCLUDE |
| `MORTGAGE1INTERESTINDEX` | NUMBER | `BIGINT` | INCLUDE |
| `MORTGAGE1INTERESTRATEMAX` | NUMBER | `NUMERIC(18,2)` | INCLUDE |
| `MORTGAGE1ADJUSTABLERATEINDEX` | TEXT | `TEXT` | INCLUDE |
| `MORTGAGE1INTERESTONLYFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `MORTGAGE1INTERESTONLYPERIOD` | TEXT | `TEXT` | INCLUDE |
| `MORTGAGE2DOCUMENTNUMBERFORMATTED` | TEXT | `TEXT` | INCLUDE |
| `MORTGAGE2DOCUMENTNUMBERLEGACY` | TEXT | `TEXT` | INCLUDE |
| `MORTGAGE2INSTRUMENTNUMBER` | TEXT | `TEXT` | INCLUDE |
| `MORTGAGE2BOOK` | TEXT | `TEXT` | INCLUDE |
| `MORTGAGE2PAGE` | TEXT | `TEXT` | INCLUDE |
| `MORTGAGE2RECORDINGDATE` | DATE | `DATE` | INCLUDE |
| `MORTGAGE2TYPE` | TEXT | `TEXT` | INCLUDE |
| `MORTGAGE2AMOUNT` | NUMBER | `NUMERIC(18,2)` | INCLUDE |
| `MORTGAGE2LENDERCODE` | NUMBER | `BIGINT` | INCLUDE |
| `MORTGAGE2LENDERNAMEFULLSTANDARDIZED` | TEXT | `TEXT` | INCLUDE |
| `MORTGAGE2LENDERNAMEFIRST` | TEXT | `TEXT` | INCLUDE |
| `MORTGAGE2LENDERNAMELAST` | TEXT | `TEXT` | INCLUDE |
| `MORTGAGE2LENDERADDRESS` | TEXT | `TEXT` | INCLUDE |
| `MORTGAGE2LENDERADDRESSCITY` | TEXT | `TEXT` | INCLUDE |
| `MORTGAGE2LENDERADDRESSSTATE` | TEXT | `TEXT` | INCLUDE |
| `MORTGAGE2LENDERADDRESSZIP` | TEXT | `TEXT` | INCLUDE |
| `MORTGAGE2LENDERADDRESSZIP4` | TEXT | `TEXT` | INCLUDE |
| `MORTGAGE2LENDERINFOENTITYCLASSIFICATION` | TEXT | `TEXT` | INCLUDE |
| `MORTGAGE2LENDERINFOSELLERCARRYBACKFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `MORTGAGE2TERM` | NUMBER | `BIGINT` | INCLUDE |
| `MORTGAGE2TERMTYPE` | TEXT | `TEXT` | INCLUDE |
| `MORTGAGE2TERMDATE` | DATE | `DATE` | INCLUDE |
| `MORTGAGE2INFOPREPAYMENTPENALTYFLAG` | TEXT | `TEXT` | INCLUDE |
| `MORTGAGE2INFOPREPAYMENTTERM` | TEXT | `TEXT` | INCLUDE |
| `MORTGAGE2INTERESTRATETYPE` | TEXT | `TEXT` | INCLUDE |
| `MORTGAGE2INTERESTRATE` | NUMBER | `NUMERIC(18,2)` | INCLUDE |
| `MORTGAGE2INTERESTTYPEINITIAL` | TEXT | `TEXT` | INCLUDE |
| `MORTGAGE2FIXEDSTEPCONVERSIONRATE` | TEXT | `TEXT` | INCLUDE |
| `MORTGAGE2DOCUMENTINFORIDERADJUSTABLERATEFLAG` | TEXT | `TEXT` | INCLUDE |
| `MORTGAGE2INFOINTERESTTYPECHANGEYEAR` | NUMBER | `INTEGER` | INCLUDE |
| `MORTGAGE2INFOINTERESTTYPECHANGEMONTH` | NUMBER | `BIGINT` | INCLUDE |
| `MORTGAGE2INFOINTERESTTYPECHANGEDAY` | NUMBER | `BIGINT` | INCLUDE |
| `MORTGAGE2INTERESTRATEMINFIRSTCHANGERATECONVERSION` | NUMBER | `NUMERIC(18,2)` | INCLUDE |
| `MORTGAGE2INTERESTRATEMAXFIRSTCHANGERATECONVERSION` | NUMBER | `NUMERIC(18,2)` | INCLUDE |
| `MORTGAGE2INTERESTCHANGEFREQUENCY` | TEXT | `TEXT` | INCLUDE |
| `MORTGAGE2INTERESTMARGIN` | NUMBER | `BIGINT` | INCLUDE |
| `MORTGAGE2INTERESTINDEX` | NUMBER | `BIGINT` | INCLUDE |
| `MORTGAGE2INTERESTRATEMAX` | NUMBER | `NUMERIC(18,2)` | INCLUDE |
| `MORTGAGE2ADJUSTABLERATEINDEX` | TEXT | `TEXT` | INCLUDE |
| `MORTGAGE2INTERESTONLYFLAG` | NUMBER | `BIGINT` | INCLUDE |
| `MORTGAGE2INTERESTONLYPERIOD` | TEXT | `TEXT` | INCLUDE |
| `TRANSFERINFOPURCHASEDOWNPAYMENT` | NUMBER | `BIGINT` | INCLUDE |
| `TRANSFERINFOPURCHASELOANTOVALUE` | NUMBER | `NUMERIC(18,2)` | INCLUDE |
| `LASTUPDATED` | DATE | `DATE` | INCLUDE |
| `PUBLICATIONDATE` | DATE | `DATE` | INCLUDE |
| `DBCREATEDATE` | TIMESTAMP_NTZ | `TIMESTAMPTZ` | INCLUDE |
| `DBUPDATEDATE` | TIMESTAMP_NTZ | `TIMESTAMPTZ` | INCLUDE |
| `DBDELETEDATE` | TIMESTAMP_NTZ | `TIMESTAMPTZ` | INCLUDE |

### LOAN_MODEL

| Column | Snowflake Type | Suggested PG Type | Action |
|--------|---------------|-------------------|--------|
| `ATTOMID` | NUMBER | `BIGINT` | INCLUDE |
| `SITUSSTATECODE` | TEXT | `TEXT` | INCLUDE |
| `SITUSCOUNTY` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYJURISDICTIONNAME` | TEXT | `TEXT` | INCLUDE |
| `SITUSSTATECOUNTYFIPS` | TEXT | `TEXT` | INCLUDE |
| `CURRENTFIRSTPOSITIONOPENLOANAMOUNT` | NUMBER | `NUMERIC(18,2)` | INCLUDE |
| `CURRENTFIRSTPOSITIONOPENLOANDOCUMENTNUMBERFORMATTED` | TEXT | `TEXT` | INCLUDE |
| `CURRENTFIRSTPOSITIONOPENLOANRECORDINGDATE` | DATE | `DATE` | INCLUDE |
| `CURRENTFIRSTPOSITIONOPENLOANTYPE` | TEXT | `TEXT` | INCLUDE |
| `CURRENTFIRSTPOSITIONOPENLOANLENDERNAMEFIRST` | TEXT | `TEXT` | INCLUDE |
| `CURRENTFIRSTPOSITIONOPENLOANLENDERNAMELAST` | TEXT | `TEXT` | INCLUDE |
| `CURRENTFIRSTPOSITIONOPENLOANLENDERINFOENTITYCLASSIFICATION` | TEXT | `TEXT` | INCLUDE |
| `CURRENTFIRSTPOSITIONOPENLOANINTERESTRATETYPE` | TEXT | `TEXT` | INCLUDE |
| `CURRENTFIRSTPOSITIONOPENLOANINTERESTRATE` | NUMBER | `NUMERIC(18,2)` | INCLUDE |
| `CURRENTFIRSTPOSITIONMORTGAGETYPE` | TEXT | `TEXT` | INCLUDE |
| `CURRENTFIRSTPOSITIONOPENLOANTRANSACTIONID` | NUMBER | `BIGINT` | INCLUDE |
| `CURRENTSECONDPOSITIONOPENLOANAMOUNT` | NUMBER | `NUMERIC(18,2)` | INCLUDE |
| `CURRENTSECONDPOSITIONOPENLOANDOCUMENTNUMBERFORMATTED` | TEXT | `TEXT` | INCLUDE |
| `CURRENTSECONDPOSITIONOPENLOANRECORDINGDATE` | DATE | `DATE` | INCLUDE |
| `CURRENTSECONDPOSITIONOPENLOANTYPE` | TEXT | `TEXT` | INCLUDE |
| `CURRENTSECONDPOSITIONOPENLOANLENDERNAMEFIRST` | TEXT | `TEXT` | INCLUDE |
| `CURRENTSECONDPOSITIONOPENLOANLENDERNAMELAST` | TEXT | `TEXT` | INCLUDE |
| `CURRENTSECONDPOSITIONOPENLOANLENDERINFOENTITYCLASSIFICATION` | TEXT | `TEXT` | INCLUDE |
| `CURRENTSECONDPOSITIONOPENLOANINTERESTRATETYPE` | TEXT | `TEXT` | INCLUDE |
| `CURRENTSECONDPOSITIONOPENLOANINTERESTRATE` | NUMBER | `NUMERIC(18,2)` | INCLUDE |
| `CURRENTSECONDPOSITIONMORTGAGETYPE` | TEXT | `TEXT` | INCLUDE |
| `CURRENTSECONDPOSITIONOPENLOANTRANSACTIONID` | NUMBER | `BIGINT` | INCLUDE |
| `CURRENTTHIRDPOSITIONOPENLOANAMOUNT` | NUMBER | `NUMERIC(18,2)` | INCLUDE |
| `CURRENTTHIRDPOSITIONOPENLOANDOCUMENTNUMBERFORMATTED` | TEXT | `TEXT` | INCLUDE |
| `CURRENTTHIRDPOSITIONOPENLOANRECORDINGDATE` | DATE | `DATE` | INCLUDE |
| `CURRENTTHIRDPOSITIONOPENLOANTYPE` | TEXT | `TEXT` | INCLUDE |
| `CURRENTTHIRDPOSITIONOPENLOANLENDERNAMEFIRST` | TEXT | `TEXT` | INCLUDE |
| `CURRENTTHIRDPOSITIONOPENLOANLENDERNAMELAST` | TEXT | `TEXT` | INCLUDE |
| `CURRENTTHIRDPOSITIONOPENLOANLENDERINFOENTITYCLASSIFICATION` | TEXT | `TEXT` | INCLUDE |
| `CURRENTTHIRDPOSITIONOPENLOANINTERESTRATETYPE` | TEXT | `TEXT` | INCLUDE |
| `CURRENTTHIRDPOSITIONOPENLOANINTERESTRATE` | NUMBER | `NUMERIC(18,2)` | INCLUDE |
| `CURRENTTHIRDPOSITIONMORTGAGETYPE` | TEXT | `TEXT` | INCLUDE |
| `CURRENTTHIRDPOSITIONOPENLOANTRANSACTIONID` | NUMBER | `BIGINT` | INCLUDE |
| `LTV` | NUMBER | `BIGINT` | INCLUDE |
| `AVAILABLEEQUITY` | NUMBER | `BIGINT` | INCLUDE |
| `LENDABLEEQUITY` | NUMBER | `BIGINT` | INCLUDE |
| `PUBLICATIONDATE` | DATE | `DATE` | INCLUDE |
| `DBCREATEDATE` | TIMESTAMP_NTZ | `TIMESTAMPTZ` | INCLUDE |
| `DBUPDATEDATE` | TIMESTAMP_NTZ | `TIMESTAMPTZ` | INCLUDE |

### PREFORECLOSURE

| Column | Snowflake Type | Suggested PG Type | Action |
|--------|---------------|-------------------|--------|
| `TRANSACTIONID` | NUMBER | `BIGINT` | INCLUDE |
| `ATTOMID` | NUMBER | `BIGINT` | INCLUDE |
| `RECORDTYPE` | TEXT | `TEXT` | INCLUDE |
| `SITUSSTATECODE` | TEXT | `TEXT` | INCLUDE |
| `SITUSCOUNTY` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYJURISDICTIONNAME` | TEXT | `TEXT` | INCLUDE |
| `SITUSSTATECOUNTYFIPS` | TEXT | `TEXT` | INCLUDE |
| `PARCELNUMBERFORMATTED` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYADDRESSFULL` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYADDRESSHOUSENUMBER` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYADDRESSSTREETDIRECTION` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYADDRESSSTREETNAME` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYADDRESSSTREETSUFFIX` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYADDRESSSTREETPOSTDIRECTION` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYADDRESSUNITPREFIX` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYADDRESSUNITVALUE` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYADDRESSCITY` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYADDRESSSTATE` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYADDRESSZIP` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYADDRESSZIP4` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYADDRESSCRRT` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYADDRESSINFOPRIVACY` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYLATITUDE` | FLOAT | `NUMERIC(18,6)` | INCLUDE |
| `PROPERTYLONGITUDE` | FLOAT | `NUMERIC(18,6)` | INCLUDE |
| `GEOQUALITY` | TEXT | `TEXT` | INCLUDE |
| `ZONEDCODELOCAL` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYUSEMUNI` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYUSEGROUP` | TEXT | `TEXT` | INCLUDE |
| `PROPERTYUSESTANDARDIZED` | TEXT | `TEXT` | INCLUDE |
| `BATHCOUNT` | NUMBER | `INTEGER` | INCLUDE |
| `BEDROOMSCOUNT` | NUMBER | `INTEGER` | INCLUDE |
| `AREABUILDING` | NUMBER | `BIGINT` | INCLUDE |
| `AREABUILDINGDEFINITIONCODE` | TEXT | `TEXT` | INCLUDE |
| `AREALOTSF` | NUMBER | `BIGINT` | INCLUDE |
| `AREALOTACRES` | NUMBER | `BIGINT` | INCLUDE |
| `YEARBUILT` | NUMBER | `INTEGER` | INCLUDE |
| `YEARBUILTEFFECTIVE` | NUMBER | `INTEGER` | INCLUDE |
| `ORIGINALLOANRECORDINGDATE` | DATE | `DATE` | INCLUDE |
| `ORIGINALLOANINSTRUMENTNUMBER` | TEXT | `TEXT` | INCLUDE |
| `ORIGINALLOANBOOKPAGE` | TEXT | `TEXT` | INCLUDE |
| `BORROWERNAMEOWNER` | TEXT | `TEXT` | INCLUDE |
| `ORIGINALLOANLOANNUMBER` | TEXT | `TEXT` | INCLUDE |
| `ORIGINALLOANAMOUNT` | NUMBER | `NUMERIC(18,2)` | INCLUDE |
| `ORIGINALLOANINTERESTRATE` | NUMBER | `NUMERIC(18,2)` | INCLUDE |
| `LOANMATURITYDATE` | DATE | `DATE` | INCLUDE |
| `LENDERNAMEFULLSTANDARDIZED` | TEXT | `TEXT` | INCLUDE |
| `LENDERADDRESS` | TEXT | `TEXT` | INCLUDE |
| `LENDERADDRESSHOUSENUMBER` | TEXT | `TEXT` | INCLUDE |
| `LENDERADDRESSSTREETDIRECTION` | TEXT | `TEXT` | INCLUDE |
| `LENDERADDRESSSTREETNAME` | TEXT | `TEXT` | INCLUDE |
| `LENDERADDRESSSTREETSUFFIX` | TEXT | `TEXT` | INCLUDE |
| `LENDERADDRESSSTREETPOSTDIRECTION` | TEXT | `TEXT` | INCLUDE |
| `LENDERADDRESSUNITVALUE` | TEXT | `TEXT` | INCLUDE |
| `LENDERADDRESSCITY` | TEXT | `TEXT` | INCLUDE |
| `LENDERADDRESSSTATE` | TEXT | `TEXT` | INCLUDE |
| `LENDERADDRESSZIP` | TEXT | `TEXT` | INCLUDE |
| `LENDERPHONE` | TEXT | `TEXT` | INCLUDE |
| `SERVICERNAME` | TEXT | `TEXT` | INCLUDE |
| `SERVICERADDRESS` | TEXT | `TEXT` | INCLUDE |
| `SERVICERCITY` | TEXT | `TEXT` | INCLUDE |
| `SERVICERSTATE` | TEXT | `TEXT` | INCLUDE |
| `SERVICERZIP` | TEXT | `TEXT` | INCLUDE |
| `SERVICERPHONE` | TEXT | `TEXT` | INCLUDE |
| `TRUSTEENAME` | TEXT | `TEXT` | INCLUDE |
| `TRUSTEEADDRESS` | TEXT | `TEXT` | INCLUDE |
| `TRUSTEEADDRESSHOUSENUMBER` | TEXT | `TEXT` | INCLUDE |
| `TRUSTEEADDRESSSTREETDIRECTION` | TEXT | `TEXT` | INCLUDE |
| `TRUSTEEADDRESSSTREETNAME` | TEXT | `TEXT` | INCLUDE |
| `TRUSTEEADDRESSSTREETSUFFIX` | TEXT | `TEXT` | INCLUDE |
| `TRUSTEEADDRESSSTREETPOSTDIRECTION` | TEXT | `TEXT` | INCLUDE |
| `TRUSTEEADDRESSUNITVALUE` | TEXT | `TEXT` | INCLUDE |
| `TRUSTEEADDRESSCITY` | TEXT | `TEXT` | INCLUDE |
| `TRUSTEEADDRESSSTATE` | TEXT | `TEXT` | INCLUDE |
| `TRUSTEEADDRESSZIP` | TEXT | `TEXT` | INCLUDE |
| `TRUSTEEPHONE` | TEXT | `TEXT` | INCLUDE |
| `FORECLOSUREINSTRUMENTDATE` | DATE | `DATE` | INCLUDE |
| `FORECLOSURERECORDINGDATE` | DATE | `DATE` | INCLUDE |
| `FORECLOSUREINSTRUMENTNUMBER` | TEXT | `TEXT` | INCLUDE |
| `FORECLOSUREBOOKPAGE` | TEXT | `TEXT` | INCLUDE |
| `CASENUMBER` | TEXT | `TEXT` | INCLUDE |
| `TRUSTEEREFERENCENUMBER` | TEXT | `TEXT` | INCLUDE |
| `PAYMENT` | NUMBER | `BIGINT` | INCLUDE |
| `DEFAULTAMOUNT` | NUMBER | `NUMERIC(18,2)` | INCLUDE |
| `PENALTYINTEREST` | NUMBER | `BIGINT` | INCLUDE |
| `LOANBALANCE` | NUMBER | `BIGINT` | INCLUDE |
| `JUDGMENTDATE` | DATE | `DATE` | INCLUDE |
| `JUDGMENTAMOUNT` | NUMBER | `NUMERIC(18,2)` | INCLUDE |
| `COURTHOUSE` | TEXT | `TEXT` | INCLUDE |
| `AUCTIONADDRESS` | TEXT | `TEXT` | INCLUDE |
| `AUCTIONHOUSENUMBER` | TEXT | `TEXT` | INCLUDE |
| `AUCTIONDIRECTION` | TEXT | `TEXT` | INCLUDE |
| `AUCTIONSTREETNAME` | TEXT | `TEXT` | INCLUDE |
| `AUCTIONSUFFIX` | TEXT | `TEXT` | INCLUDE |
| `AUCTIONPOSTDIRECTION` | TEXT | `TEXT` | INCLUDE |
| `AUCTIONUNIT` | TEXT | `TEXT` | INCLUDE |
| `AUCTIONCITY` | TEXT | `TEXT` | INCLUDE |
| `AUCTIONDATE` | DATE | `DATE` | INCLUDE |
| `AUCTIONTIME` | TEXT | `TEXT` | INCLUDE |
| `RECORDEDAUCTIONOPENINGBID` | NUMBER | `BIGINT` | INCLUDE |
| `ESTIMATEDVALUE` | NUMBER | `NUMERIC(18,2)` | INCLUDE |
| `CREATEDATE` | DATE | `DATE` | INCLUDE |
| `RECORDLASTUPDATED` | TIMESTAMP_NTZ | `TIMESTAMPTZ` | INCLUDE |
| `PUBLICATIONDATE` | DATE | `DATE` | INCLUDE |
| `DBCREATEDATE` | TIMESTAMP_NTZ | `TIMESTAMPTZ` | INCLUDE |
| `DBUPDATEDATE` | TIMESTAMP_NTZ | `TIMESTAMPTZ` | INCLUDE |

---
## Notes

- Population % is based on a sample of up to 5,000 storage rows (TX, PROPERTYUSESTANDARDIZED=229).
- Join all other views to TAX_ASSESSOR via ATTOMID.
- Columns with pct_populated < 5% in the sample should be reviewed before inclusion in Neon schema.
- JSONB columns (VARIANT/OBJECT/ARRAY in Snowflake) should be reviewed for flattening vs. JSONB storage.


(function (root, factory) {if (typeof define === 'function' && define.amd) {define(['exports', 'echarts'], factory);} else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {factory(exports, require('echarts'));} else {factory({}, root.echarts);}}(this, function (exports, echarts) {var log = function (msg) {if (typeof console !== 'undefined') {console && console.error && console.error(msg);}};if (!echarts) {log('ECharts is not Loaded');return;}if (!echarts.registerMap) {log('ECharts Map is not loaded');return;}echarts.registerMap('spb', {"type":"FeatureCollection","features":[{"type":"Feature","id":"500106","properties":{"name":"沙坪坝区","cp":[106.4542,29.541224],"childNum":1},"geometry":{"type":"Polygon","coordinates":[[[106.457575,29.668897],[106.458251,29.667845],[106.460052,29.666295],[106.462036,29.664591],[106.463759,29.663042],[106.465647,29.661414],[106.46737,29.66017],[106.468834,29.658853],[106.469778,29.657696],[106.47047,29.656044],[106.470825,29.6546],[106.470799,29.652419],[106.4704,29.650928],[106.470002,29.64972],[106.469223,29.647708],[106.46827,29.64598],[106.466876,29.644492],[106.465655,29.643098],[106.463697,29.641068],[106.462554,29.640398],[106.461324,29.639728],[106.459921,29.63883],[106.456906,29.637098],[106.454896,29.635349],[106.453623,29.634001],[106.45208,29.632109],[106.450997,29.630405],[106.450304,29.628652],[106.450165,29.62671],[106.450355,29.625051],[106.451066,29.623],[106.452175,29.621459],[106.453119,29.620303],[106.45441,29.619447],[106.456576,29.618578],[106.458664,29.618246],[106.460665,29.617686],[106.462821,29.616283],[106.463072,29.614813],[106.463141,29.613627],[106.462483,29.611237],[106.462292,29.609728],[106.461903,29.608258],[106.461825,29.60798],[106.461547,29.606459],[106.460915,29.604865],[106.460109,29.603425],[106.459304,29.60214],[106.45894,29.600771],[106.458126,29.599025],[106.457502,29.598043],[106.456271,29.597067],[106.455301,29.596088],[106.454054,29.594349],[106.452901,29.592914],[106.451922,29.591705],[106.451385,29.590569],[106.451021,29.589124],[106.451263,29.587823],[106.451939,29.586441],[106.453403,29.585352],[106.454781,29.584345],[106.457128,29.583701],[106.458861,29.583374],[106.461026,29.582584],[106.463443,29.581178],[106.466023,29.578701],[106.467132,29.577465],[106.468682,29.575918],[106.470134,29.574141],[106.471415,29.572598],[106.472783,29.570596],[106.474229,29.56882],[106.474913,29.56782],[106.477398,29.565115],[106.478852,29.563491],[106.480479,29.561713],[106.481683,29.560553],[106.48305,29.559007],[106.484686,29.557381],[106.486062,29.556218],[106.487698,29.555126],[106.488564,29.554886],[106.490035,29.554559],[106.491948,29.554531],[106.494042,29.554807],[106.494215,29.553806],[106.494484,29.553035],[106.494414,29.552627],[106.494103,29.552332],[106.493185,29.552022],[106.489342,29.550968],[106.483612,29.550218],[106.482193,29.549961],[106.482002,29.549756],[106.482097,29.549167],[106.48279,29.548082],[106.481647,29.547925],[106.479907,29.547882],[106.479587,29.547366],[106.480998,29.546481],[106.481385,29.545531],[106.481387,29.545516],[106.481396,29.545502],[106.482019,29.543972],[106.482997,29.540325],[106.483447,29.539042],[106.483438,29.538415],[106.483083,29.538123],[106.482722,29.538094],[106.482708,29.5381],[106.482692,29.538091],[106.481854,29.538022],[106.480166,29.537862],[106.479335,29.537953],[106.478651,29.538214],[106.478129,29.538688],[106.478113,29.538698],[106.478105,29.538709],[106.477753,29.53903],[106.477734,29.539039],[106.477732,29.539049],[106.477578,29.539189],[106.477468,29.539369],[106.477468,29.53938],[106.477453,29.539393],[106.477137,29.539911],[106.477023,29.54027],[106.477024,29.540286],[106.477013,29.540301],[106.476937,29.540541],[106.476935,29.540556],[106.476929,29.540568],[106.47666,29.541417],[106.476565,29.543011],[106.476894,29.544217],[106.476436,29.544882],[106.475708,29.545249],[106.475414,29.545174],[106.475552,29.544168],[106.475033,29.543516],[106.475223,29.542962],[106.475318,29.541609],[106.474591,29.539992],[106.475387,29.538248],[106.475682,29.536687],[106.47537,29.535798],[106.474954,29.535484],[106.474305,29.535336],[106.473006,29.5355],[106.472037,29.535594],[106.470735,29.53549],[106.470726,29.535486],[106.470707,29.535488],[106.469075,29.535358],[106.468721,29.535306],[106.468426,29.535263],[106.468402,29.535255],[106.468384,29.535257],[106.466296,29.534953],[106.464996,29.534513],[106.462182,29.53313],[106.460077,29.532119],[106.459878,29.531783],[106.460215,29.530872],[106.461298,29.529611],[106.461618,29.528592],[106.461592,29.528084],[106.46137,29.527657],[106.461409,29.527644],[106.461351,29.527621],[106.461068,29.527079],[106.461074,29.527023],[106.46104,29.527024],[106.460951,29.526854],[106.460345,29.526332],[106.459747,29.526089],[106.459534,29.526082],[106.459521,29.526083],[106.459507,29.526081],[106.459465,29.526079],[106.459459,29.526078],[106.459451,29.526079],[106.458465,29.526048],[106.457539,29.525885],[106.456663,29.525422],[106.456343,29.525071],[106.456637,29.523889],[106.455857,29.521822],[106.452314,29.516675],[106.451383,29.513891],[106.45138,29.513875],[106.451373,29.513861],[106.451161,29.513226],[106.449731,29.512588],[106.448466,29.511134],[106.448119,29.510322],[106.448076,29.509519],[106.448518,29.507929],[106.449601,29.506427],[106.44954,29.506082],[106.44896,29.505395],[106.448171,29.505474],[106.447807,29.50496],[106.44779,29.503955],[106.44772,29.501348],[106.447495,29.500046],[106.446984,29.499914],[106.445814,29.500898],[106.444843,29.500506],[106.444462,29.50012],[106.44408,29.498462],[106.443178,29.495841],[106.442884,29.494817],[106.442485,29.494396],[106.441089,29.494012],[106.438298,29.494379],[106.43798,29.494386],[106.437698,29.494425],[106.435618,29.494584],[106.43522,29.494735],[106.434595,29.495289],[106.434344,29.495882],[106.434439,29.497295],[106.434266,29.497903],[106.434006,29.498134],[106.433217,29.498493],[106.431569,29.498788],[106.429167,29.498919],[106.42797,29.498623],[106.427007,29.498018],[106.42666,29.497623],[106.426365,29.496944],[106.426434,29.495871],[106.426338,29.495109],[106.425792,29.494046],[106.425289,29.493597],[106.424534,29.49333],[106.420586,29.493235],[106.4178,29.492193],[106.416733,29.492204],[106.415474,29.492602],[106.412315,29.492807],[106.409867,29.492834],[106.408434,29.49233],[106.407739,29.492636],[106.407496,29.492929],[106.407045,29.494458],[106.406743,29.495833],[106.406739,29.495844],[106.406737,29.495858],[106.406367,29.497545],[106.406315,29.49921],[106.406507,29.501388],[106.406871,29.502111],[106.407392,29.502304],[106.408547,29.502063],[106.409398,29.501981],[106.410188,29.502174],[106.410509,29.502421],[106.410892,29.503181],[106.411022,29.504733],[106.411222,29.505554],[106.411039,29.505945],[106.410857,29.506042],[106.410466,29.506014],[106.410162,29.505988],[106.409615,29.506099],[106.409155,29.50664],[106.409095,29.507139],[106.409442,29.50804],[106.410006,29.50852],[106.410319,29.508687],[106.411013,29.508962],[106.411361,29.509301],[106.411664,29.510326],[106.411873,29.512412],[106.412195,29.51556],[106.412629,29.523899],[106.412777,29.526009],[106.413281,29.533449],[106.413837,29.536453],[106.413229,29.53878],[106.414201,29.54012],[106.414071,29.540639],[106.413854,29.540817],[106.412986,29.540895],[106.409427,29.541109],[106.406787,29.541515],[106.406353,29.541469],[106.405554,29.541078],[106.404338,29.539153],[106.403504,29.538883],[106.401837,29.539495],[106.401142,29.540086],[106.399474,29.542734],[106.398441,29.544683],[106.398502,29.546622],[106.398727,29.548421],[106.398649,29.548816],[106.398067,29.549535],[106.397181,29.54986],[106.39673,29.549929],[106.395887,29.549245],[106.395096,29.547914],[106.394323,29.545209],[106.394314,29.544449],[106.394731,29.542921],[106.395018,29.542621],[106.395904,29.542214],[106.396217,29.541797],[106.395965,29.540763],[106.395878,29.539964],[106.39579,29.538354],[106.395521,29.537164],[106.395156,29.536942],[106.394096,29.537248],[106.392298,29.538962],[106.391715,29.539489],[106.391212,29.54022],[106.39076,29.540513],[106.389708,29.540614],[106.388943,29.539517],[106.387588,29.539147],[106.386597,29.538532],[106.385449,29.536226],[106.384771,29.535643],[106.383667,29.535275],[106.382876,29.535209],[106.381364,29.535466],[106.379277,29.536571],[106.378477,29.537335],[106.378112,29.537491],[106.378095,29.537556],[106.378078,29.537662],[106.378016,29.537747],[106.377869,29.53794],[106.377686,29.538176],[106.37766,29.538267],[106.377425,29.538916],[106.377391,29.539001],[106.377365,29.539086],[106.377313,29.539214],[106.377234,29.539439],[106.377173,29.539728],[106.377113,29.540014],[106.377113,29.540414],[106.377113,29.5407],[106.377182,29.540828],[106.377243,29.540931],[106.377339,29.540985],[106.377434,29.541044],[106.377834,29.541157],[106.378165,29.541099],[106.378556,29.541156],[106.378825,29.541154],[106.379077,29.541326],[106.379208,29.541441],[106.379278,29.541612],[106.379217,29.54184],[106.379156,29.541999],[106.379086,29.542183],[106.37906,29.54232],[106.378956,29.542728],[106.378939,29.542828],[106.378895,29.542988],[106.378825,29.543273],[106.378826,29.543618],[106.378895,29.544076],[106.379104,29.544534],[106.379295,29.545049],[106.379313,29.545086],[106.379365,29.545223],[106.379513,29.54547],[106.379704,29.545792],[106.379773,29.546081],[106.379895,29.546652],[106.379834,29.546804],[106.379773,29.54694],[106.379513,29.547055],[106.379313,29.547114],[106.378982,29.547285],[106.378722,29.547402],[106.378461,29.547632],[106.378261,29.54769],[106.378061,29.547863],[106.377974,29.548135],[106.377965,29.548172],[106.377843,29.548197],[106.376704,29.548148],[106.374878,29.547853],[106.375104,29.54702],[106.37393,29.546636],[106.373356,29.546618],[106.372591,29.546776],[106.372252,29.54701],[106.372157,29.547244],[106.37247,29.547716],[106.372661,29.548081],[106.3726,29.549639],[106.372374,29.550514],[106.372026,29.550856],[106.371157,29.550968],[106.369208,29.550985],[106.367199,29.551384],[106.366434,29.55181],[106.365199,29.552994],[106.364173,29.55373],[106.362442,29.554301],[106.361059,29.555072],[106.359658,29.557095],[106.357823,29.558839],[106.356126,29.559755],[106.355369,29.559743],[106.355013,29.559521],[106.354873,29.559134],[106.355352,29.558318],[106.355543,29.557715],[106.354934,29.556546],[106.35436,29.556383],[106.353899,29.556521],[106.353159,29.55708],[106.352429,29.558609],[106.351759,29.559237],[106.351071,29.55919],[106.349653,29.558493],[106.346773,29.556647],[106.34418,29.555561],[106.343536,29.554909],[106.343631,29.554639],[106.34458,29.554101],[106.344806,29.553843],[106.34471,29.553721],[106.344153,29.553553],[106.342361,29.553187],[106.341734,29.552934],[106.340725,29.552092],[106.340098,29.549985],[106.338889,29.5484],[106.337801,29.547302],[106.336086,29.546348],[106.335146,29.544485],[106.334441,29.544039],[106.334067,29.54401],[106.331152,29.544899],[106.329769,29.54543],[106.329368,29.545084],[106.329307,29.543736],[106.329577,29.542731],[106.329229,29.542576],[106.32842,29.542905],[106.32815,29.543156],[106.327384,29.545308],[106.326679,29.545939],[106.326123,29.54609],[106.324974,29.545988],[106.323904,29.545545],[106.322537,29.544587],[106.321832,29.544833],[106.320283,29.544813],[106.318839,29.543821],[106.317751,29.543703],[106.315515,29.544019],[106.313784,29.545003],[106.313105,29.545032],[106.312792,29.544873],[106.312339,29.544011],[106.312279,29.543579],[106.312296,29.542691],[106.312078,29.542039],[106.311556,29.541495],[106.310277,29.540876],[106.309929,29.540878],[106.309216,29.541231],[106.309381,29.542097],[106.308711,29.542343],[106.308019,29.541347],[106.30796,29.541208],[106.306476,29.541217],[106.304631,29.539261],[106.302517,29.538135],[106.30116,29.537833],[106.300456,29.537834],[106.300134,29.538016],[106.299712,29.538611],[106.299447,29.539787],[106.29876,29.541872],[106.298073,29.542555],[106.297699,29.542641],[106.297307,29.54243],[106.296551,29.541558],[106.295977,29.540958],[106.295707,29.540827],[106.295055,29.540611],[106.294698,29.540314],[106.29462,29.539951],[106.294889,29.539226],[106.294994,29.538681],[106.294315,29.535294],[106.293924,29.532215],[106.293663,29.531248],[106.293271,29.530803],[106.29261,29.530457],[106.29128,29.530438],[106.289506,29.530937],[106.287912,29.531664],[106.287766,29.53176],[106.287498,29.531887],[106.285489,29.532875],[106.285142,29.532966],[106.28442,29.53285],[106.284229,29.532509],[106.284646,29.531422],[106.284672,29.530957],[106.284516,29.530805],[106.283133,29.53025],[106.282403,29.530164],[106.280508,29.530251],[106.2777,29.530483],[106.276153,29.530671],[106.275319,29.530418],[106.27392,29.529201],[106.273572,29.528815],[106.272999,29.527963],[106.27239,29.527448],[106.271877,29.527348],[106.270253,29.527397],[106.267872,29.527107],[106.265604,29.526157],[106.264727,29.525197],[106.264049,29.52534],[106.262608,29.52705],[106.261374,29.529384],[106.261235,29.53094],[106.260775,29.532156],[106.259907,29.532581],[106.258361,29.532527],[106.257614,29.532327],[106.257475,29.532012],[106.257961,29.531311],[106.258144,29.530796],[106.2579,29.530384],[106.257171,29.529875],[106.256832,29.529873],[106.256242,29.530468],[106.255591,29.531892],[106.255356,29.532381],[106.255191,29.532487],[106.254644,29.532407],[106.254245,29.532424],[106.253437,29.532847],[106.251658,29.537118],[106.251111,29.539332],[106.251059,29.540867],[106.251311,29.543926],[106.251762,29.546001],[106.251719,29.551009],[106.251711,29.559424],[106.252006,29.562274],[106.253439,29.567914],[106.254073,29.56977],[106.254664,29.570643],[106.254942,29.570817],[106.25561,29.570606],[106.257156,29.569499],[106.257885,29.569478],[106.259909,29.570579],[106.260204,29.571015],[106.260178,29.571254],[106.259223,29.572491],[106.257929,29.573661],[106.256296,29.575217],[106.256029,29.576113],[106.256333,29.577765],[106.257601,29.581108],[106.258947,29.585063],[106.259381,29.587571],[106.259616,29.590968],[106.260016,29.592616],[106.261805,29.597325],[106.263143,29.600714],[106.265584,29.60589],[106.266679,29.607541],[106.2676,29.608524],[106.269859,29.610202],[106.270684,29.610352],[106.271884,29.610199],[106.272457,29.610273],[106.273682,29.610853],[106.274195,29.611294],[106.274899,29.61223],[106.275821,29.61425],[106.276977,29.618436],[106.277881,29.620339],[106.279237,29.621877],[106.281358,29.623819],[106.282271,29.624836],[106.282697,29.625683],[106.282757,29.626148],[106.282505,29.626725],[106.282158,29.626946],[106.281297,29.627128],[106.279367,29.627115],[106.278507,29.627324],[106.2753,29.629145],[106.273788,29.63039],[106.27304,29.631227],[106.273049,29.631625],[106.275239,29.633968],[106.276065,29.635133],[106.277186,29.636723],[106.277986,29.637442],[106.279116,29.637833],[106.281567,29.637599],[106.282306,29.63747],[106.283775,29.636887],[106.285723,29.636013],[106.286688,29.635786],[106.287661,29.635852],[106.288148,29.636033],[106.289087,29.636679],[106.289566,29.637215],[106.290122,29.638378],[106.290157,29.638975],[106.289661,29.640224],[106.288862,29.641035],[106.287279,29.641914],[106.28401,29.642965],[106.282854,29.643105],[106.281281,29.643286],[106.280559,29.64375],[106.280003,29.644396],[106.279395,29.645698],[106.279238,29.647007],[106.279438,29.64962],[106.279412,29.652534],[106.279656,29.653982],[106.280403,29.655417],[106.281038,29.656128],[106.281629,29.656482],[106.28289,29.656679],[106.283411,29.656692],[106.284107,29.656699],[106.284402,29.656854],[106.285072,29.657862],[106.285411,29.659343],[106.285637,29.660059],[106.286507,29.661538],[106.287689,29.663504],[106.287967,29.664479],[106.287733,29.665291],[106.286376,29.666854],[106.28569,29.667455],[106.284751,29.668194],[106.284446,29.668666],[106.284229,29.670227],[106.284481,29.672342],[106.284508,29.673392],[106.284499,29.675287],[106.284003,29.676231],[106.283464,29.676521],[106.282847,29.676297],[106.282021,29.67569],[106.281613,29.675497],[106.280005,29.675198],[106.279335,29.675516],[106.278692,29.676685],[106.278405,29.679114],[106.278371,29.68469],[106.279102,29.690827],[106.278823,29.691252],[106.278119,29.691707],[106.277919,29.69197],[106.277876,29.69243],[106.278154,29.693385],[106.278884,29.693985],[106.280058,29.694676],[106.280345,29.695161],[106.280458,29.697451],[106.280206,29.700528],[106.280215,29.702063],[106.280449,29.703287],[106.280797,29.703442],[106.281745,29.702993],[106.282457,29.701622],[106.283161,29.699561],[106.283961,29.698724],[106.285613,29.697912],[106.286439,29.697755],[106.287387,29.69791],[106.287856,29.698216],[106.288134,29.698573],[106.288143,29.699306],[106.287274,29.700799],[106.287144,29.70153],[106.2879,29.703873],[106.2887,29.705011],[106.289248,29.705394],[106.290439,29.705567],[106.290891,29.705133],[106.291387,29.704168],[106.291717,29.703854],[106.293196,29.703368],[106.29403,29.703293],[106.295074,29.703637],[106.296631,29.705421],[106.297066,29.706455],[106.298092,29.710982],[106.29958,29.716641],[106.302399,29.725405],[106.304313,29.730494],[106.305113,29.733603],[106.305349,29.735399],[106.305688,29.736623],[106.307428,29.736344],[106.307724,29.736347],[106.308202,29.736619],[106.308994,29.737679],[106.30942,29.738153],[106.310273,29.738932],[106.310803,29.739185],[106.311526,29.739259],[106.312979,29.73913],[106.316198,29.738975],[106.317808,29.738757],[106.318104,29.738625],[106.318443,29.738117],[106.318495,29.737395],[106.318155,29.735959],[106.317538,29.734474],[106.317189,29.733807],[106.31739,29.733516],[106.318242,29.733088],[106.320331,29.732252],[106.320652,29.730946],[106.323716,29.729541],[106.3261,29.728703],[106.327144,29.728529],[106.327675,29.728585],[106.328414,29.728942],[106.328867,29.729483],[106.329294,29.73065],[106.329485,29.731516],[106.329703,29.732684],[106.329964,29.733253],[106.330242,29.733569],[106.330999,29.733917],[106.332453,29.733571],[106.336734,29.734095],[106.34011,29.73377],[106.34105,29.73391],[106.345923,29.733572],[106.351449,29.733934],[106.354441,29.734058],[106.355068,29.734298],[106.355999,29.735277],[106.35606,29.735474],[106.355782,29.73591],[106.354877,29.736818],[106.354998,29.737222],[106.355964,29.737751],[106.35646,29.737769],[106.359009,29.736927],[106.364533,29.735637],[106.365316,29.735521],[106.366707,29.735992],[106.367586,29.736608],[106.368317,29.737707],[106.368656,29.738947],[106.368752,29.740605],[106.368317,29.743235],[106.367699,29.744969],[106.367543,29.745353],[106.366656,29.745655],[106.366404,29.745874],[106.366291,29.746555],[106.366586,29.746998],[106.367185,29.747302],[106.367218,29.747309],[106.367238,29.747329],[106.367595,29.74751],[106.368091,29.747546],[106.369456,29.747048],[106.371952,29.745272],[106.373613,29.744536],[106.374422,29.744654],[106.374596,29.744913],[106.374613,29.745846],[106.375257,29.746246],[106.376231,29.74636],[106.376666,29.746235],[106.379126,29.74487],[106.380656,29.744225],[106.381473,29.744551],[106.381795,29.744869],[106.382134,29.745737],[106.382265,29.747717],[106.382534,29.747908],[106.38276,29.747856],[106.384542,29.747022],[106.387515,29.745538],[106.388862,29.744258],[106.39073,29.743233],[106.391043,29.742452],[106.390739,29.740774],[106.389774,29.739143],[106.390095,29.737911],[106.391277,29.736483],[106.391894,29.736336],[106.392172,29.736473],[106.39265,29.737183],[106.393137,29.738703],[106.393102,29.739154],[106.392989,29.739764],[106.39312,29.740042],[106.393632,29.740441],[106.394875,29.740846],[106.397559,29.741435],[106.398906,29.741548],[106.401798,29.741222],[106.408129,29.739179],[106.409484,29.738852],[106.410135,29.738897],[106.41063,29.739112],[106.411411,29.739826],[106.412618,29.741742],[106.413304,29.742554],[106.414085,29.742955],[106.415179,29.743482],[106.415387,29.74389],[106.415153,29.745236],[106.414996,29.746579],[106.415309,29.746868],[106.416151,29.747021],[106.416463,29.747158],[106.416898,29.748111],[106.417288,29.74965],[106.417783,29.750198],[106.418833,29.750402],[106.419319,29.750256],[106.422104,29.748138],[106.423987,29.74708],[106.424898,29.746914],[106.426112,29.747792],[106.428255,29.748663],[106.429305,29.748915],[106.431412,29.749146],[106.433008,29.749072],[106.436173,29.748269],[106.437205,29.747608],[106.437338,29.747474],[106.437348,29.747444],[106.437358,29.747453],[106.438315,29.746491],[106.438956,29.746073],[106.440577,29.74583],[106.44212,29.74474],[106.442762,29.744014],[106.442926,29.743641],[106.442562,29.741781],[106.442345,29.732692],[106.442059,29.730383],[106.441487,29.729364],[106.440438,29.728143],[106.439969,29.727504],[106.438045,29.724038],[106.437256,29.722244],[106.436857,29.718223],[106.435764,29.716045],[106.434021,29.71321],[106.43344,29.711707],[106.431522,29.702634],[106.431236,29.700776],[106.428876,29.690443],[106.42767,29.683227],[106.426516,29.680035],[106.426638,29.679143],[106.427132,29.677944],[106.427245,29.677343],[106.42695,29.674736],[106.428225,29.668535],[106.429083,29.662937],[106.428953,29.662353],[106.428129,29.661305],[106.425969,29.659393],[106.424407,29.657473],[106.425448,29.656903],[106.427244,29.656587],[106.42838,29.65628],[106.429369,29.656118],[106.430193,29.656248],[106.431494,29.655938],[106.43296,29.655626],[106.434104,29.65546],[106.435569,29.655006],[106.43687,29.654694],[106.438179,29.654243],[106.438829,29.654086],[106.439315,29.653792],[106.4398,29.65364],[106.440286,29.65363],[106.441595,29.653604],[106.442254,29.653451],[106.442895,29.653009],[106.443372,29.652143],[106.443996,29.650698],[106.445175,29.65059],[106.447142,29.650953],[106.448086,29.651446],[106.448702,29.652205],[106.448971,29.653896],[106.448356,29.658377],[106.448607,29.661459],[106.449266,29.662986],[106.450418,29.664379],[106.451302,29.665126],[106.453321,29.666362],[106.455461,29.667454],[106.456683,29.668011],[106.457177,29.668398],[106.457575,29.668897]]]}}]});}));
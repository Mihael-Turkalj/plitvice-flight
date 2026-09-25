// Content for the sections below the flight. Figures are the park's own where it publishes them
// (np-plitvicka-jezera.hr); lake elevations, areas and depths are from the Croatian Wikipedia table,
// with the park's figures for Kozjak. See README for the full source list.

export const facts = [
  { value: '1949', label: 'Croatia’s first national park' },
  { value: '1979', label: 'On the UNESCO World Heritage List' },
  { value: '~297 km²', label: 'of forest, meadow and water' },
  { value: '16', label: 'lakes, stepping down in a chain' },
  { value: '133 m', label: 'from the first lake to the last' },
  { value: '78 m', label: 'Veliki slap, Croatia’s tallest waterfall' },
  { value: '<1%', label: 'of the park is water; about 3/4 is forest' },
  { value: '1.49 M', label: 'visitors in 2024, from about 163 countries' },
]

export type Lake = { name: string; elevation: number; area: number; depth: number; group: 'Upper' | 'Lower' }

export const lakes: Lake[] = [
  { name: 'Prošćansko', elevation: 636, area: 68, depth: 37, group: 'Upper' },
  { name: 'Ciginovac', elevation: 620, area: 7.5, depth: 11, group: 'Upper' },
  { name: 'Okrugljak', elevation: 613, area: 4.1, depth: 15, group: 'Upper' },
  { name: 'Batinovac', elevation: 610, area: 1.5, depth: 5, group: 'Upper' },
  { name: 'Veliko jezero', elevation: 607, area: 1.5, depth: 8, group: 'Upper' },
  { name: 'Malo jezero', elevation: 605, area: 2, depth: 10, group: 'Upper' },
  { name: 'Vir', elevation: 598, area: 0.6, depth: 4, group: 'Upper' },
  { name: 'Galovac', elevation: 582, area: 12.5, depth: 24, group: 'Upper' },
  { name: 'Milino jezero', elevation: 564, area: 1, depth: 1, group: 'Upper' },
  { name: 'Gradinsko', elevation: 553, area: 8.1, depth: 10, group: 'Upper' },
  { name: 'Burgeti', elevation: 545, area: 0.1, depth: 2, group: 'Upper' },
  { name: 'Kozjak', elevation: 534, area: 82, depth: 47, group: 'Upper' },
  { name: 'Milanovac', elevation: 523, area: 3.2, depth: 18, group: 'Lower' },
  { name: 'Gavanovac', elevation: 514, area: 1, depth: 10, group: 'Lower' },
  { name: 'Kaluđerovac', elevation: 505, area: 2.1, depth: 13, group: 'Lower' },
  { name: 'Novakovića brod', elevation: 503, area: 0.4, depth: 3, group: 'Lower' },
]

export const tufaSteps = [
  {
    title: 'Water full of stone',
    body: 'The rivers run through karst, a landscape of limestone and dolomite, and carry a lot of dissolved calcium carbonate.',
  },
  {
    title: 'Moss and algae catch it',
    body: 'Where the water tumbles over a barrier, the calcite comes out as tiny crystals that stick to films of algae, bacteria and moss.',
  },
  {
    title: 'Living dams grow',
    body: 'The moss keeps growing on top while its base turns to stone. The barriers rise about 13.5 mm a year and hold every lake in place.',
  },
]

export const life = [
  { photo: 'bear', tag: 'Large carnivores', title: 'Bear, wolf and lynx', body: 'All three still roam the park’s forests, along with the otter along its rivers.' },
  { photo: 'orchid', tag: 'Over 60 orchids', title: 'Lady’s slipper', body: 'The park has some of Europe’s densest populations of this rare orchid.' },
  { photo: 'trout', tag: 'Clear water', title: 'Fish you can count', body: 'The water is so clear you can watch fish from the boardwalks. Swimming is banned to keep it that way.' },
  { photo: 'crna-rijeka', tag: 'Old-growth forest', title: 'A 500-year-old fir', body: 'Three quarters of the park is forest. In the Čorkova uvala reserve stands a fir more than five centuries old and 58 metres tall.' },
]

export const lifeCounts = [
  { value: '1,400+', label: 'plant taxa' },
  { value: '168', label: 'bird species' },
  { value: '321', label: 'butterflies and moths' },
  { value: '22', label: 'bat species' },
]

export const seasons = [
  { name: 'Spring', photo: 'veliki-prstavac', body: 'Snowmelt feeds the lakes and the Upper Lakes reopen, usually in early April. May is green and lively, and busy again.' },
  { name: 'Summer', photo: 'lower-lakes-aerial', body: 'Long, warm days on the boardwalks. July and August are the busiest months, so start early or come late in the day.' },
  { name: 'Autumn', photo: 'kozjak-autumn', body: 'About three quarters of the park is beech and fir forest. In October the hills around the lakes turn copper and gold.' },
  { name: 'Winter', photo: 'winter-ice', body: 'Snow from November to March and waterfalls frozen into ice. The Lower Lakes usually stay open while the Upper Lakes often close.' },
]

export const names = [
  { photo: 'lower-lakes-portrait', name: 'Plitvice', body: 'From plitko, shallow: the lakes sit in shallow basins. The name was first written down in 1558, as “Prythwycze”.', kind: 'History' },
  { photo: 'proscansko-aerial', name: 'Prošćansko', body: 'Legend says the people begged, prositi, for rain so long that the first lake was named after their prayers. Sceptics point to prošće, fence stakes.', kind: 'Folk tale' },
  { photo: 'gavanovac', name: 'Gavanovac', body: 'A man called Gavan is said to have lost his treasure to this lake. The water is clear enough to look for it. Nobody has found it.', kind: 'Folk tale' },
  { photo: 'galovac', name: 'Galovac', body: 'Perhaps named after Captain Gal, who fought the Ottomans, or after an outlaw leader called Galović. The lake has never said which.', kind: 'Folk tale' },
]

export const history = [
  { year: '1558', text: 'First written mention, as “Prythwycze”, in a decision of the Croatian Parliament.' },
  { year: '1888', text: 'Crown Princess Stéphanie visits, and the first arrangements for tourists are made.' },
  { year: '1893', text: 'Dr Gustav Janeček founds the Society for the Beautification of the Plitvice Lakes. The first hotel follows in 1896.' },
  { year: '1898', text: 'Opera star Milka Trnina gives the takings of her farewell concert to the Society. A waterfall is named after her.' },
  { year: '1949', text: 'On 8 April, Plitvice becomes Croatia’s first national park.' },
  { year: '1962', text: 'The first of the Winnetou westerns is filmed among the lakes, followed by more until 1968.' },
  { year: '1979', text: 'UNESCO inscribes the lakes on the World Heritage List. The World Heritage site is extended in 2000.' },
  { year: '1991', text: 'At Easter, the first deadly clash of the Croatian War of Independence takes place here. From 1992 to 1997 the park is on UNESCO’s list of World Heritage in Danger.' },
  { year: '2024', text: 'Almost 1.5 million people visit, from about 163 countries.' },
]

export const visitNotes = [
  { title: 'Getting around', body: 'Eight visitor routes and four hiking trails. Boats cross Kozjak and a panoramic train saves the longer walks; both come with entry.' },
  { title: 'Entrances', body: 'Entrance 1 is by the Lower Lakes and Veliki slap; Entrance 2 is by Kozjak, closer to the Upper Lakes. There is also the smaller Flora entrance.' },
  { title: 'When to come', body: 'Spring and autumn are calmer and just as beautiful. In summer, arrive early. In winter, expect snow and some closed paths.' },
  { title: 'Please', body: 'No swimming, no drones, dogs on a leash, and stay on the boardwalks. The tufa under your feet is fragile and still growing.' },
]

/** Commons photos used below the flight (credited in the footer with the flight's own sources). */
export const parkPhotos = ['tufa', 'bear', 'orchid', 'trout', 'crna-rijeka', 'kozjak-autumn', 'winter-ice', 'veliki-prstavac', 'lower-lakes-aerial', 'lower-lakes-portrait', 'proscansko-aerial', 'gavanovac', 'galovac']

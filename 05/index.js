const surprisingFact = "The bumblebee bat is the world's smallest mammal";
//challenge 1
console.log(`Surprising Fact: ${surprisingFact}`);
console.log('Surprising Fact:', surprisingFact);
const familyTree = [
    {
        name: 'Person 1',
        children: [
            {
                name: 'Person 2',
                children: [
                    {
                        name: 'Person 3',
                        children: [
                            {
                                name: 'Person 4',
                            },
                        ],
                    },
                ],
            },
        ],
    },
];
console.dir(familyTree, { depth: null });
console.log(JSON.stringify(familyTree, null, 2));
function importantTask() {
    console.count();
}
importantTask();
importantTask();
importantTask();
importantTask();
console.countReset();
importantTask();
importantTask();
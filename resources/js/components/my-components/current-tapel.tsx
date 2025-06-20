
type variantCurrentTapel = 'short'|'long';

function currentTapel({variant='long'}:{variant?:variantCurrentTapel}):string {
    let date = new Date();
    let currentYear = date.getFullYear();
    let firstYear = date.getMonth()>5?currentYear:currentYear - 1;
    let lastYear = date.getMonth()>5? currentYear + 1: currentYear;
    let semester = date.getMonth()>5?1:2;
    if(variant ==='long'){
        return 'Tapel '+ firstYear +'/' + lastYear +' Semester '+ semester;
    }
    return firstYear +'/' + lastYear +' ('+ semester+')';
}

export{
    currentTapel
}

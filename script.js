function submitData() {
    const input = document.getElementById('jsonInput').value;
    let parsedInput;
    try {
        parsedInput = JSON.parse(input);
    } catch (e) {
        alert('Invalid JSON format');
        return;
    }

    processResponse(parsedInput.data);
}

function processResponse(data) {
    // Separate numbers and alphabets
    const numbers = data.filter(x => /^\d+$/.test(x));
    const alphabets = data.filter(x => /^[a-zA-Z]+$/.test(x));
    
    // Find the highest lowercase alphabet
    const lowercaseAlphabets = alphabets.filter(x => x === x.toLowerCase());
    const highestLowercaseAlphabet = lowercaseAlphabets.length ? [lowercaseAlphabets.sort().pop()] : [];

    const result = {
        "numbers": numbers,
        "alphabets": alphabets,
        "highest_lowercase_alphabet": highestLowercaseAlphabet
    };

    renderResponse(result);
}

function renderResponse(data) {
    const filterSelect = document.getElementById('filterSelect');
    const selectedOptions = Array.from(filterSelect.selectedOptions).map(option => option.value);

    const responseDiv = document.getElementById('responseDiv');
    responseDiv.innerHTML = '';

    if (selectedOptions.includes('alphabets')) {
        responseDiv.innerHTML += `<p>Alphabets: ${data.alphabets.length ? data.alphabets.join(', ') : 'No alphabets found'}</p>`;
    }
    if (selectedOptions.includes('numbers')) {
        responseDiv.innerHTML += `<p>Numbers: ${data.numbers.length ? data.numbers.join(', ') : 'No numbers found'}</p>`;
    }
    if (selectedOptions.includes('highest_lowercase_alphabet')) {
        responseDiv.innerHTML += `<p>Highest Lowercase Alphabet: ${data.highest_lowercase_alphabet.length ? data.highest_lowercase_alphabet.join(', ') : 'No lowercase alphabet found'}</p>`;
    }
}

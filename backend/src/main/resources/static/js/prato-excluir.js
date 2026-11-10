async function excluir(e) {
	const anchor = e.target;
	const id = anchor.dataset.id;
	console.log(`Excluindo prato ID: ${id}...`);

	const response = await fetch(
		`http://localhost:8080/api/prato/${id}`,
		{method: 'DELETE'}
	);

	if (response.ok) {
		const tr = anchor.parentElement.parentElement;
		const table = tr.parentElement;
		table.removeChild(tr);
		console.log(`ID: ${id} excluído`);
	} else {
		console.error('Falhou.');
	}
}


function init() {
	const anchors = document.querySelectorAll('.action-remove');
	for (let a of anchors) {
		a.addEventListener('click', excluir);
	}
}
init();
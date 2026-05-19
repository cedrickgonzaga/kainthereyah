document.addEventListener('DOMContentLoaded', () => {
    const qtyInputs = document.querySelectorAll('.item-qty');
    const totalCostEl = document.getElementById('total-cost');
    const resetBtn = document.getElementById('reset-btn');
    const deliveryCheckbox = document.getElementById('delivery-fee');

    const addPkgBtns = document.querySelectorAll('.add-pkg-btn');
    const minusPkgBtns = document.querySelectorAll('.minus-pkg-btn');
    const pkgQties = document.querySelectorAll('.pkg-qty');

    function calculateTotal() {
        let total = 0;
        
        qtyInputs.forEach(input => {
            const qty = parseInt(input.value) || 0;
            const price = parseFloat(input.dataset.price) || 0;
            total += qty * price;
        });

        pkgQties.forEach(qtySpan => {
            const qty = parseInt(qtySpan.textContent) || 0;
            const price = parseFloat(qtySpan.dataset.price) || 0;
            total += qty * price;
        });

        if (deliveryCheckbox && deliveryCheckbox.checked) {
            total += parseFloat(deliveryCheckbox.dataset.fee) || 0;
        }

        totalCostEl.textContent = `₱${total.toFixed(2)}`;
    }

    qtyInputs.forEach(input => {
        input.addEventListener('input', calculateTotal);
    });

    addPkgBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const qtySpan = pkgQties[index];
            let currentQty = parseInt(qtySpan.textContent) || 0;
            if (currentQty < 1) { // Maximum of 1 package
                qtySpan.textContent = currentQty + 1;
                calculateTotal();
            }
        });
    });

    minusPkgBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const qtySpan = pkgQties[index];
            let currentQty = parseInt(qtySpan.textContent) || 0;
            if (currentQty > 0) {
                qtySpan.textContent = currentQty - 1;
                calculateTotal();
            }
        });
    });

    if (deliveryCheckbox) {
        deliveryCheckbox.addEventListener('change', calculateTotal);
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            qtyInputs.forEach(input => {
                input.value = 0;
            });
            pkgQties.forEach(qtySpan => {
                qtySpan.textContent = "0";
            });
            if (deliveryCheckbox) deliveryCheckbox.checked = false;
            calculateTotal();
        });
    }
});

function submitMessage() {
    const emailInput = document.getElementById('email');
    const fullNameInput = document.getElementById('fullName');
    const messageInput = document.getElementById('textArea');

    const email = emailInput.value;
    const fullName = fullNameInput ? fullNameInput.value : '';
    const message = messageInput.value;

    let isValid = true;

    emailInput.classList.remove('is-invalid');
    if (fullNameInput) fullNameInput.classList.remove('is-invalid');
    messageInput.classList.remove('is-invalid');

    if (fullNameInput && !fullName) {
        fullNameInput.classList.add('is-invalid');
        isValid = false;
    }

    if (!email || !email.includes('@')) {
        emailInput.classList.add('is-invalid');
        isValid = false;
    }

    if (!message) {
        messageInput.classList.add('is-invalid');
        isValid = false;
    }

    if (!isValid) {
        return false;
    }

    const modalElement = document.getElementById('submitModal');
    if (modalElement && typeof bootstrap !== 'undefined') {
        const submitModal = new bootstrap.Modal(modalElement);
        submitModal.show();
    }

    document.getElementById('contactForm').reset();
    
    document.getElementById('contactForm').classList.remove('was-validated');
}
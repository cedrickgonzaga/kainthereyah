document.addEventListener('DOMContentLoaded', () => {
    const qtyInputs = document.querySelectorAll('.item-qty');
    const totalCostEl = document.getElementById('total-cost');
    const resetBtn = document.getElementById('reset-btn');
    const deliveryCheckbox = document.getElementById('delivery-fee');

    function calculateTotal() {
        let total = 0;
        qtyInputs.forEach(input => {
            const qty = parseInt(input.value) || 0;
            const price = parseFloat(input.dataset.price) || 0;
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

    if (deliveryCheckbox) {
        deliveryCheckbox.addEventListener('change', calculateTotal);
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            qtyInputs.forEach(input => {
                input.value = 0;
            });
            calculateTotal();
        });
    }
});

function submit(){
    alert("Your message was submitted!")
}
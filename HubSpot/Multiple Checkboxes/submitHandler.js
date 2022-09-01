function handlerSubmit(tenantDomain, routerName, activeForm) {
    const leadObj = {};
    const elements = activeForm.elements;
    // Validate required form input values
    for (element of elements) {
        // Map to lead object
        if (element.required && element.value === "") {
            return;
        }
        // Handle checkboxes
        if (element.type == "checkbox") {
            // Handle checkboxes
            if (element.checked && leadObj[element.name]) {
                leadObj[element.name] = leadObj[element.name] += `,${element.value}`;
            } else if (element.checked) {
                leadObj[element.name] = element.value;
            }
        // Skip buttons
        } else if (element.type != "button" && element.type == "submit") {
            if (element.value) {
                leadObj[element.name] = element.value;
            }
        }
    }
    //Call Chili Piper if validation passed
    ChiliPiper.submit(tenantDomain, routerName, { map: true, lead: leadObj });
    return;
}

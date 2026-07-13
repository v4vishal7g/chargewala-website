// ======================================
// Contact Page
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("📩 Contact Page Loaded");

    const contactForm = document.getElementById("contactForm");

    const successModal =
        document.getElementById("successModal");

    const closeSuccess =
        document.getElementById("closeSuccess");

    if (!contactForm) return;

    // ======================================
    // Submit Form
    // ======================================

    contactForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const submitBtn =
            contactForm.querySelector(".send-btn");

        submitBtn.disabled = true;

        submitBtn.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            Sending...
        `;

        try {

            await db
                .collection("contact_requests")
                .add({

                    name:
                        document.getElementById("name").value.trim(),

                    email:
                        document.getElementById("email").value.trim(),

                    phone:
                        document.getElementById("phone").value.trim(),

                    subject:
                        document.getElementById("subject").value.trim(),

                    message:
                        document.getElementById("message").value.trim(),

                    status: "new",

                    createdAt:
                        firebase.firestore.FieldValue.serverTimestamp()

                });

            // Reset Form
            contactForm.reset();

            // Show Success Modal
            if (successModal) {

                successModal.classList.add("show");

            }

        }

        catch (error) {

            console.error("Contact Error:", error);

            alert("❌ Failed to send your message. Please try again.");

        }

        finally {

            submitBtn.disabled = false;

            submitBtn.innerHTML = `
                <i class="fa-solid fa-paper-plane"></i>
                Send Message
            `;

        }

    });

    // ======================================
    // Close Success Modal
    // ======================================

    if (closeSuccess) {

        closeSuccess.addEventListener("click", () => {

            successModal.classList.remove("show");

        });

    }

});
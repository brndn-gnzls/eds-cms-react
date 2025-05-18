import React from "react";
import styles from "./GettingHelpInternal.module.css";

const GettingHelpInternal = () => {
    return (
        <div className={styles.gettingHelpWrapper}>
            <h2>Help improve this page</h2>

            <p>
                Your feedback and contributions are invaluable to us as we strive to
                make our design system documentation as comprehensive and user-friendly
                as possible. Whether you have suggestions for new content, spotted an
                inconsistency, or have ideas for improvement, we want to hear it.
            </p>

            <ul className={styles.helpList}>
                <li>
                    Participate in the 'Button' component design on{" "}
                    <a href="#" className={styles.helpLink}>GitHub</a> and contribute your findings.
                </li>
                <li>
                    <a href="#" className={styles.helpLink}>Suggest an improvement</a> – learn more
                    about the BrandName intake process for proposing modifications and
                    changes to existing components.
                </li>
            </ul>


            <h3>Need Help?</h3>
            <p className={styles.helpTopParagraph}>
                Your insights and contributions are crucial as we aim to continuously
                evolve our design system. We're committed to improvement with your help,
                so please, <a href="#" className={styles.helpLink}>get in touch</a>.
            </p>

            <div className={styles.bulletListWrapper}>
            <p>
                <strong>Feedback Form:</strong> Share your thoughts, suggestions, or
                feedback through our easy-to-use online{" "}
                <a href="#" className={styles.helpLink}>form</a>. It's quick and ensures
                your insights are heard directly by our team.
            </p>
            <p>
                <strong>Community Forums:</strong> Dive into our community forums to
                discuss ideas, ask questions, and connect with other users and the
                design system team. Check out the forums{" "}
                <a href="#" className={styles.helpLink}>here</a>.
            </p>
            <p>
                <strong>Email Us Directly:</strong> For more detailed feedback, concerns,
                or proposals, don't hesitate to send us an email at{" "}
                <a href="#" className={styles.helpLink}>designsystem@eds.elevance.com</a>.
                We aim to respond to each email personally.
            </p>
            <p>
                <strong>Social Media:</strong> Follow us on our social media channels to
                stay up-to-date with the latest news, updates, and community highlights.
                Plus, it's a great way to quickly get in touch or share your design system
                success stories with a wider audience.
            </p>
            </div>
        </div>
    );
};

export default GettingHelpInternal;

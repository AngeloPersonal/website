export default function LiveEditToast() {
    return (
        <div style={{
            position: "fixed",
            transform: "translateX(50%)",
            bottom: "1.3rem",
            right: "50%",
            backgroundColor: "#1f2937",
            color: "white",
            padding: "0.5rem 1rem",
            borderRadius: "0.25rem",
            zIndex: 1000
        }}>
            <span style={{
                backgroundColor: "lab(79.1095 16.747 59.9157)",
                width: "0.6rem",
                height: "0.6rem",
                borderRadius: "9999px",
                display: "inline-block",
                marginRight: "0.75rem"
            }}></span>
            Viewing draft.
        </div>
    )
}
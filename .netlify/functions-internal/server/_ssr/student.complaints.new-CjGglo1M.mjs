import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as useDsim, a as INSTITUTION, g as kprcasSchools, h as kprcasComplaintLocations, m as kprcasComplaintCategories, n as Button, u as cn } from "./button-C7ZpzBGx.mjs";
import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { Bt as Check, Ct as Eye, J as Lock, Lt as ChevronRight, P as Plus, Pt as CircleCheck, Rt as ChevronLeft, _t as FileText, a as User, bt as FileHeadphone, d as Trash2, ht as File, i as Users, l as Upload, mt as Film, rt as Info, u as TriangleAlert, x as ShieldCheck, yt as FileImage } from "../_libs/lucide-react.mjs";
import { j as fmtDateTime } from "./UnauthorizedPage-B_V7V3Jx.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Cd1zWcTd.mjs";
import { t as Input } from "./input-bGUSqmNl.mjs";
import { t as Label } from "./label-Di2QZFiw.mjs";
import { t as Textarea } from "./textarea-DmMEYLpm.mjs";
import { n as RadioGroupItem, t as RadioGroup } from "./radio-group-OWjO5u3n.mjs";
import { t as Checkbox } from "./checkbox-_AGMNU8u.mjs";
import { t as StudentProtected } from "./StudentProtected-BxPSUqrJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/student.complaints.new-CjGglo1M.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NewComplaintRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudentProtected, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewComplaintWizard, {}) });
}
var STEPS = [
	{
		id: 1,
		name: "Student Info",
		icon: User
	},
	{
		id: 2,
		name: "Incident",
		icon: FileText
	},
	{
		id: 3,
		name: "Person Involved",
		icon: Users
	},
	{
		id: 4,
		name: "Witnesses",
		icon: Eye
	},
	{
		id: 5,
		name: "Evidence",
		icon: Upload
	},
	{
		id: 6,
		name: "Privacy & Urgency",
		icon: ShieldCheck
	},
	{
		id: 7,
		name: "Review & Submit",
		icon: CircleCheck
	}
];
function NewComplaintWizard() {
	const { studentProfile, addComplaint } = useDsim();
	const navigate = useNavigate();
	const [currentStep, setCurrentStep] = (0, import_react.useState)(1);
	const [submittedComplaintId, setSubmittedComplaintId] = (0, import_react.useState)(null);
	const [title, setTitle] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("Misconduct");
	const [incidentDate, setIncidentDate] = (0, import_react.useState)((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
	const [incidentTime, setIncidentTime] = (0, import_react.useState)("14:30");
	const [location, setLocation] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [persons, setPersons] = (0, import_react.useState)([{
		id: "p-1",
		name: "",
		rollNumber: "",
		department: "",
		relationship: "Student",
		isPrimary: true,
		unknownDetails: false,
		details: ""
	}]);
	const [hasWitnesses, setHasWitnesses] = (0, import_react.useState)("not_sure");
	const [witnesses, setWitnesses] = (0, import_react.useState)([]);
	const [evidenceList, setEvidenceList] = (0, import_react.useState)([]);
	const [privacyPreference, setPrivacyPreference] = (0, import_react.useState)("confidential");
	const [urgency, setUrgency] = (0, import_react.useState)("normal");
	const [confirmedAccuracy, setConfirmedAccuracy] = (0, import_react.useState)(false);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [errors, setErrors] = (0, import_react.useState)({});
	const addPerson = () => {
		setPersons((prev) => [...prev, {
			id: `p-${Date.now()}`,
			name: "",
			rollNumber: "",
			department: "",
			relationship: "Student",
			isPrimary: false,
			unknownDetails: false,
			details: ""
		}]);
	};
	const removePerson = (id) => {
		if (persons.length <= 1) return;
		setPersons((prev) => prev.filter((p) => p.id !== id));
	};
	const updatePerson = (id, patch) => {
		setPersons((prev) => prev.map((p) => p.id === id ? {
			...p,
			...patch
		} : p));
	};
	const addWitness = () => {
		setWitnesses((prev) => [...prev, {
			id: `w-${Date.now()}`,
			name: "",
			rollNumber: "",
			department: "",
			relationship: "Student",
			contactInfo: "",
			description: "",
			unknownDetails: false
		}]);
	};
	const removeWitness = (id) => {
		setWitnesses((prev) => prev.filter((w) => w.id !== id));
	};
	const updateWitness = (id, patch) => {
		setWitnesses((prev) => prev.map((w) => w.id === id ? {
			...w,
			...patch
		} : w));
	};
	const handleFileUpload = (e) => {
		const files = e.target.files;
		if (!files || files.length === 0) return;
		Array.from(files).forEach((file) => {
			if (file.size > 26214400) {
				toast.error(`File "${file.name}" exceeds maximum allowed limit of 25MB.`);
				return;
			}
			const reader = new FileReader();
			reader.onload = () => {
				const item = {
					id: `ev-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
					fileName: file.name,
					fileType: file.type || "application/octet-stream",
					fileSize: `${(file.size / 1048576).toFixed(1)} MB`,
					url: reader.result,
					description: "",
					uploadedAt: (/* @__PURE__ */ new Date()).toISOString()
				};
				setEvidenceList((prev) => [...prev, item]);
			};
			reader.readAsDataURL(file);
		});
		e.target.value = "";
	};
	const removeEvidence = (id) => {
		setEvidenceList((prev) => prev.filter((e) => e.id !== id));
	};
	const updateEvidenceDesc = (id, desc) => {
		setEvidenceList((prev) => prev.map((e) => e.id === id ? {
			...e,
			description: desc
		} : e));
	};
	const validateStep = (step) => {
		const errs = {};
		if (step === 2) {
			if (!title.trim()) errs["title"] = "Please provide an incident title or summary.";
			if (!location.trim()) errs["location"] = "Please enter the specific location on campus.";
			if (!description.trim() || description.trim().length < 20) errs["description"] = "Please enter a detailed description of what occurred (min 20 characters).";
			if (!incidentDate) errs["incidentDate"] = "Please specify the date of the incident.";
		}
		if (step === 3) persons.forEach((p, idx) => {
			if (!p.unknownDetails && !p.name.trim()) errs[`person_${p.id}`] = `Please enter the name or check "I don't know this person's complete details".`;
			if (p.unknownDetails && !p.details?.trim()) errs[`person_details_${p.id}`] = `Please provide a visual or circumstantial description of Person #${idx + 1}.`;
		});
		setErrors(errs);
		return Object.keys(errs).length === 0;
	};
	const nextStep = () => {
		if (validateStep(currentStep)) {
			setCurrentStep((s) => Math.min(STEPS.length, s + 1));
			window.scrollTo({
				top: 0,
				behavior: "smooth"
			});
		} else toast.error("Please fill in the required fields before proceeding.");
	};
	const prevStep = () => {
		setCurrentStep((s) => Math.max(1, s - 1));
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	};
	const handleSubmit = () => {
		if (!confirmedAccuracy) {
			toast.error("Please confirm the accuracy declaration before submitting.");
			return;
		}
		setSubmitting(true);
		setTimeout(() => {
			const newRec = addComplaint({
				studentId: studentProfile.id,
				studentName: studentProfile.name,
				studentRoll: studentProfile.rollNumber,
				studentEmail: studentProfile.email,
				studentDepartment: studentProfile.department,
				academicYear: studentProfile.academicYear,
				yearOfStudy: studentProfile.yearOfStudy,
				title,
				category,
				incidentDate,
				incidentTime,
				location,
				description,
				personsInvolved: persons,
				hasWitnesses,
				witnesses,
				evidence: evidenceList,
				privacyPreference,
				urgency
			});
			setSubmitting(false);
			setSubmittedComplaintId(newRec.id);
			toast.success("Complaint Submitted Successfully!", { description: `Your complaint ID is ${newRec.id}. Tracking active.` });
		}, 750);
	};
	if (submittedComplaintId) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "max-w-2xl mx-auto py-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-2xl border border-emerald-500/30 bg-card p-8 text-center shadow-lg space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto grid size-16 place-items-center rounded-full bg-emerald-500/10 text-emerald-500 ring-8 ring-emerald-500/5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-9" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-semibold px-3 py-1 text-xs uppercase tracking-wider",
							children: "Status: Submitted (Awaiting Institutional Review)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-bold tracking-tight text-foreground",
							children: "Complaint Submitted Successfully"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground max-w-md mx-auto",
							children: "Your complaint has been registered. Authorized institutional personnel (Principal, Administrative Officer, and Discipline Committee Head) have been notified according to institutional policy."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-muted/30 p-4 text-left max-w-md mx-auto space-y-3 font-mono text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center py-1 border-b border-border/60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground font-sans",
								children: "Complaint ID:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-bold text-primary",
								children: submittedComplaintId
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center py-1 border-b border-border/60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground font-sans",
								children: "Submitted On:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-foreground",
								children: fmtDateTime((/* @__PURE__ */ new Date()).toISOString())
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center py-1 border-b border-border/60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground font-sans",
								children: "Category:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-foreground font-sans",
								children: category
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center py-1 border-b border-border/60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground font-sans",
								children: "Confidentiality:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-foreground font-sans capitalize",
								children: privacyPreference.replace(/_/g, " ")
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center py-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground font-sans",
								children: "Notification Status:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-emerald-600 dark:text-emerald-400 font-sans font-medium flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3" }), " Officers Notified"]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg bg-primary/5 border border-primary/20 p-3 text-xs text-primary max-w-md mx-auto flex items-center gap-2 text-left",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"Keep your Complaint ID (",
						submittedComplaintId,
						") for reference. You will receive updates as your grievance progresses through committee review."
					] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row items-center justify-center gap-3 pt-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: () => navigate({
							to: "/student/complaints/$complaintId",
							params: { complaintId: submittedComplaintId }
						}),
						className: "w-full sm:w-auto text-xs bg-primary hover:bg-primary/90 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4" }), " View Complaint"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: () => navigate({ to: "/student/dashboard" }),
						className: "w-full sm:w-auto text-xs",
						children: "Return to Dashboard"
					})]
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-3xl mx-auto space-y-6 pb-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-border pb-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/student/dashboard",
						className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-3.5" }), " Back to Dashboard"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-bold tracking-tight text-foreground",
						children: "Raise a Complaint / Report Incident"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: "Provide detailed information to assist the Discipline Committee in reviewing the incident safely and promptly."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto pb-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-between min-w-[580px] px-2",
					children: STEPS.map((step, idx) => {
						const isCompleted = currentStep > step.id;
						const isCurrent = currentStep === step.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center flex-1 last:flex-none",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									if (isCompleted) setCurrentStep(step.id);
								},
								disabled: !isCompleted && !isCurrent,
								className: "flex flex-col items-center gap-1 group text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("grid size-8 place-items-center rounded-full text-xs font-semibold transition-all", isCompleted ? "bg-primary text-primary-foreground" : isCurrent ? "border-2 border-primary bg-primary/10 text-primary" : "border border-border bg-muted text-muted-foreground"),
									children: isCompleted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : step.id
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("text-[0.68rem] whitespace-nowrap font-medium", isCurrent ? "text-primary font-bold" : isCompleted ? "text-foreground" : "text-muted-foreground"),
									children: step.name
								})]
							}), idx < STEPS.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("h-0.5 flex-1 mx-2 transition-colors", currentStep > step.id ? "bg-primary" : "bg-border") })]
						}, step.id);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card p-5 sm:p-7 shadow-sm space-y-6",
				children: [
					currentStep === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-b border-border pb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-base font-bold text-foreground",
									children: "1. Student Information"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "These details are taken from your authenticated college account and verify your status as a student."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-primary/20 bg-primary/5 p-3.5 text-xs text-primary flex items-start gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									children: "Auto-Populated Profile:"
								}), " These details are taken from your college account. You can choose your confidentiality preferences in Step 6 before final submission."] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-xs text-muted-foreground",
											children: "Student Full Name"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: studentProfile.name,
											disabled: true,
											className: "bg-muted text-xs font-semibold cursor-not-allowed"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-xs text-muted-foreground",
											children: "Student ID / Roll Number"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: studentProfile.rollNumber,
											disabled: true,
											className: "bg-muted text-xs font-mono font-semibold cursor-not-allowed"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-xs text-muted-foreground",
											children: "College Email Address"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: studentProfile.email,
											disabled: true,
											className: "bg-muted text-xs cursor-not-allowed"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-xs text-muted-foreground",
											children: "Department"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: studentProfile.department,
											disabled: true,
											className: "bg-muted text-xs cursor-not-allowed"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-xs text-muted-foreground",
											children: "Academic Year"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: studentProfile.academicYear,
											disabled: true,
											className: "bg-muted text-xs cursor-not-allowed"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-xs text-muted-foreground",
											children: "Year of Study"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: studentProfile.yearOfStudy,
											disabled: true,
											className: "bg-muted text-xs cursor-not-allowed"
										})]
									})
								]
							})
						]
					}),
					currentStep === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-b border-border pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-base font-bold text-foreground",
								children: "2. Incident Information"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Describe the nature, date, and location of the incident clearly."
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
											htmlFor: "incidentTitle",
											className: "text-xs font-semibold flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Complaint / Incident Title ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-destructive",
												children: "*"
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[0.68rem] text-muted-foreground font-normal",
												children: "Brief summary title"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "incidentTitle",
											placeholder: "e.g. Unscheduled lab access and equipment damage",
											value: title,
											onChange: (e) => setTitle(e.target.value),
											className: cn("text-xs", errors["title"] && "border-destructive")
										}),
										errors["title"] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[0.7rem] text-destructive",
											children: errors["title"]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
												className: "text-xs font-semibold",
												children: ["Category ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-destructive",
													children: "*"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
												value: category,
												onValueChange: (v) => setCategory(v),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
													className: "text-xs",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select category" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: kprcasComplaintCategories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													value: cat,
													className: "text-xs",
													children: cat
												}, cat)) })]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
													htmlFor: "incidentDate",
													className: "text-xs font-semibold",
													children: ["Date of Incident ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-destructive",
														children: "*"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "incidentDate",
													type: "date",
													value: incidentDate,
													onChange: (e) => setIncidentDate(e.target.value),
													className: cn("text-xs", errors["incidentDate"] && "border-destructive")
												}),
												errors["incidentDate"] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[0.7rem] text-destructive",
													children: errors["incidentDate"]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "incidentTime",
												className: "text-xs font-semibold",
												children: "Approximate Time"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "incidentTime",
												type: "time",
												value: incidentTime,
												onChange: (e) => setIncidentTime(e.target.value),
												className: "text-xs"
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
												htmlFor: "incidentLocation",
												className: "text-xs font-semibold",
												children: ["Location on Campus ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-destructive",
													children: "*"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[0.68rem] text-muted-foreground",
												children: "Select preset or type specific venue"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-1 sm:grid-cols-2 gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
												onValueChange: (v) => setLocation(v),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
													className: "text-xs",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select KPRCAS Campus Location" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: kprcasComplaintLocations.map((loc) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													value: loc,
													className: "text-xs",
													children: loc
												}, loc)) })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "incidentLocation",
												placeholder: "or specify room/block (e.g. Lab B-204)",
												value: location,
												onChange: (e) => setLocation(e.target.value),
												className: cn("text-xs", errors["location"] && "border-destructive")
											})]
										}),
										errors["location"] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[0.7rem] text-destructive",
											children: errors["location"]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
												htmlFor: "incidentDesc",
												className: "text-xs font-semibold",
												children: ["Detailed Description ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-destructive",
													children: "*"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[0.68rem] text-muted-foreground font-mono",
												children: [description.length, " characters"]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
											id: "incidentDesc",
											placeholder: "Please describe what happened, including relevant details, dates, locations, and circumstances.",
											value: description,
											onChange: (e) => setDescription(e.target.value),
											rows: 6,
											className: cn("text-xs leading-relaxed", errors["description"] && "border-destructive")
										}),
										errors["description"] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[0.7rem] text-destructive",
											children: errors["description"]
										})
									]
								})
							]
						})]
					}),
					currentStep === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-b border-border pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-base font-bold text-foreground",
								children: "3. Person Reported / Involved"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Identify the individuals involved. Neutral terminology is used during the complaint review stage."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "outline",
								size: "sm",
								onClick: addPerson,
								className: "text-xs gap-1 self-start sm:self-auto",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), " Add Another Person"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-4",
							children: persons.map((p, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: cn("rounded-xl border p-4 space-y-3.5 transition-all bg-card", p.isPrimary ? "border-primary/40 ring-1 ring-primary/20" : "border-border"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: cn("rounded-md px-2 py-0.5 text-[0.68rem] font-bold uppercase tracking-wider", p.isPrimary ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"),
												children: p.isPrimary ? "Primary Person Reported" : `Person Involved #${idx + 1}`
											}), p.isPrimary && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[0.7rem] text-muted-foreground hidden sm:inline",
												children: "Main subject of this complaint"
											})]
										}), persons.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "button",
											variant: "ghost",
											size: "icon",
											onClick: () => removePerson(p.id),
											className: "size-7 text-muted-foreground hover:text-destructive",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center space-x-2 pt-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
											id: `unknown-${p.id}`,
											checked: !!p.unknownDetails,
											onCheckedChange: (checked) => updatePerson(p.id, { unknownDetails: !!checked })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: `unknown-${p.id}`,
											className: "text-xs text-muted-foreground font-medium cursor-pointer",
											children: "I don't know this person's complete details (describe appearance/context below)"
										})]
									}),
									!p.unknownDetails ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
													className: "text-xs",
													children: ["Full Name ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-destructive",
														children: "*"
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													placeholder: "e.g. Harish Kumar",
													value: p.name,
													onChange: (e) => updatePerson(p.id, { name: e.target.value }),
													className: "text-xs"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													className: "text-xs",
													children: "Student ID / Roll Number (if known)"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													placeholder: "e.g. 21CS047",
													value: p.rollNumber || "",
													onChange: (e) => updatePerson(p.id, { rollNumber: e.target.value }),
													className: "text-xs font-mono"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													className: "text-xs",
													children: "School / Department (if known)"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
													value: p.department || "",
													onValueChange: (v) => updatePerson(p.id, { department: v }),
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
														className: "text-xs",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select School" })
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: kprcasSchools.map((school) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														value: school,
														className: "text-xs",
														children: school
													}, school)) })]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													className: "text-xs",
													children: "Role / Relationship"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
													value: p.relationship,
													onValueChange: (v) => updatePerson(p.id, { relationship: v }),
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
														className: "text-xs",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															value: "Student",
															className: "text-xs",
															children: "Student"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															value: "Faculty",
															className: "text-xs",
															children: "Faculty"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															value: "Staff",
															className: "text-xs",
															children: "Staff"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															value: "Other",
															className: "text-xs",
															children: "Other"
														})
													] })]
												})]
											})
										]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
											className: "text-xs",
											children: ["Description of Person (Physical appearance, clothes, location) ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-destructive",
												children: "*"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
											placeholder: "e.g. Senior male student, approx 5'10'', wearing blue jacket, was standing near the bench...",
											value: p.details || "",
											onChange: (e) => updatePerson(p.id, {
												details: e.target.value,
												name: p.name || "Unidentified Person"
											}),
											rows: 3,
											className: "text-xs"
										})]
									}),
									errors[`person_${p.id}`] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[0.7rem] text-destructive",
										children: errors[`person_${p.id}`]
									}),
									errors[`person_details_${p.id}`] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[0.7rem] text-destructive",
										children: errors[`person_details_${p.id}`]
									})
								]
							}, p.id))
						})]
					}),
					currentStep === 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-b border-border pb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-base font-bold text-foreground",
									children: "4. Witness Information"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Adding witnesses helps corroborate statements and accelerates the review process."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs font-semibold",
									children: "Were there any witnesses present during the incident?"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioGroup, {
									value: hasWitnesses,
									onValueChange: (v) => {
										setHasWitnesses(v);
										if (v === "yes" && witnesses.length === 0) addWitness();
									},
									className: "flex gap-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center space-x-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
												value: "yes",
												id: "wit-yes"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "wit-yes",
												className: "text-xs font-medium cursor-pointer",
												children: "Yes"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center space-x-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
												value: "no",
												id: "wit-no"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "wit-no",
												className: "text-xs font-medium cursor-pointer",
												children: "No"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center space-x-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
												value: "not_sure",
												id: "wit-notsure"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "wit-notsure",
												className: "text-xs font-medium cursor-pointer",
												children: "Not sure"
											})]
										})
									]
								})]
							}),
							hasWitnesses === "yes" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4 pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-semibold text-foreground",
										children: "Witness List"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "button",
										variant: "outline",
										size: "sm",
										onClick: addWitness,
										className: "text-xs gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), " Add Witness"]
									})]
								}), witnesses.map((w, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-border p-4 bg-muted/20 space-y-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-xs font-bold text-foreground",
												children: ["Witness #", idx + 1]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												type: "button",
												variant: "ghost",
												size: "icon",
												onClick: () => removeWitness(w.id),
												className: "size-7 text-muted-foreground hover:text-destructive",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														className: "text-xs",
														children: "Witness Name"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														placeholder: "e.g. Amit Sharma",
														value: w.name,
														onChange: (e) => updateWitness(w.id, { name: e.target.value }),
														className: "text-xs"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														className: "text-xs",
														children: "Roll Number / ID"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														placeholder: "e.g. 21CS008",
														value: w.rollNumber || "",
														onChange: (e) => updateWitness(w.id, { rollNumber: e.target.value }),
														className: "text-xs font-mono"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														className: "text-xs",
														children: "Relationship / Context"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														placeholder: "e.g. Classmate / Lab Partner",
														value: w.relationship || "",
														onChange: (e) => updateWitness(w.id, { relationship: e.target.value }),
														className: "text-xs"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														className: "text-xs",
														children: "Optional Contact Info (Email / Phone)"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														placeholder: "e.g. amit.cs21@kprcas.ac.in",
														value: w.contactInfo || "",
														onChange: (e) => updateWitness(w.id, { contactInfo: e.target.value }),
														className: "text-xs"
													})]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												className: "text-xs",
												children: "Description of What Witness Observed"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												placeholder: "e.g. Was standing next to bench 3 and heard the verbal exchange.",
												value: w.description || "",
												onChange: (e) => updateWitness(w.id, { description: e.target.value }),
												className: "text-xs"
											})]
										})
									]
								}, w.id))]
							})
						]
					}),
					currentStep === 5 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-b border-border pb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-base font-bold text-foreground",
									children: "5. Supporting Evidence"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "You can attach photos, videos, audio recordings, screenshots, or documents that may help the Discipline Committee understand the complaint."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border-2 border-dashed border-border p-6 text-center hover:border-primary/50 transition-colors bg-muted/10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "file",
									id: "evidenceFileInput",
									multiple: true,
									accept: "image/*,video/*,audio/*,.pdf,.doc,.docx",
									onChange: handleFileUpload,
									className: "hidden"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									htmlFor: "evidenceFileInput",
									className: "cursor-pointer flex flex-col items-center justify-center space-y-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid size-12 place-items-center rounded-full bg-primary/10 text-primary",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-6" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs font-semibold text-foreground",
											children: "Click to browse files or drag & drop here"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[0.7rem] text-muted-foreground",
											children: "Supports Photos (PNG, JPG), Videos (MP4), Audio (MP3, WAV), PDF, and Word documents (Max 25MB each)"
										})
									]
								})]
							}),
							evidenceList.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3 pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center justify-between",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs font-semibold text-foreground",
										children: [
											"Attached Files (",
											evidenceList.length,
											")"
										]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-2",
									children: evidenceList.map((ev, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg border border-border bg-card p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3 min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "grid size-9 shrink-0 place-items-center rounded-md bg-secondary text-primary",
												children: ev.fileType.startsWith("image/") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileImage, { className: "size-4" }) : ev.fileType.startsWith("video/") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Film, { className: "size-4" }) : ev.fileType.startsWith("audio/") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileHeadphone, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(File, { className: "size-4" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "min-w-0 flex-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-semibold text-foreground truncate",
													children: ev.fileName
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-[0.68rem] text-muted-foreground font-mono",
													children: ev.fileSize
												})]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 w-full sm:w-auto",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												placeholder: "Optional note / description",
												value: ev.description || "",
												onChange: (e) => updateEvidenceDesc(ev.id, e.target.value),
												className: "h-8 text-xs max-w-xs"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												type: "button",
												variant: "ghost",
												size: "icon",
												onClick: () => removeEvidence(ev.id),
												className: "size-8 text-muted-foreground hover:text-destructive shrink-0",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
											})]
										})]
									}, ev.id))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg bg-muted/40 border border-border p-3 text-[0.7rem] text-muted-foreground flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-3.5 text-emerald-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Evidence files are stored in an encrypted vault and never exposed publicly." })]
							})
						]
					}),
					currentStep === 6 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-b border-border pb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-base font-bold text-foreground",
									children: "6. Privacy Preference & Urgency"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Choose how your identity should be protected and let the committee know the urgency level."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs font-bold text-foreground",
									children: "Confidentiality Preference"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioGroup, {
									value: privacyPreference,
									onValueChange: (v) => setPrivacyPreference(v),
									className: "space-y-2.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: cn("flex items-start space-x-3 rounded-xl border p-3.5 transition-colors cursor-pointer", privacyPreference === "identify" ? "border-primary bg-primary/5" : "border-border hover:bg-muted/30"),
											onClick: () => setPrivacyPreference("identify"),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
												value: "identify",
												id: "priv-identify",
												className: "mt-0.5"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-0.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "priv-identify",
													className: "text-xs font-bold cursor-pointer text-foreground",
													children: "Full Disclosure"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[0.72rem] text-muted-foreground",
													children: "Your identity is available to authorized committee members to assist in direct communication."
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: cn("flex items-start space-x-3 rounded-xl border p-3.5 transition-colors cursor-pointer", privacyPreference === "confidential" ? "border-primary bg-primary/5" : "border-border hover:bg-muted/30"),
											onClick: () => setPrivacyPreference("confidential"),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
												value: "confidential",
												id: "priv-conf",
												className: "mt-0.5"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-0.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
													htmlFor: "priv-conf",
													className: "text-xs font-bold cursor-pointer text-foreground flex items-center gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Committee-Only" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "rounded bg-primary/10 text-primary text-[0.65rem] px-1.5 py-0.2",
														children: "Recommended"
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[0.72rem] text-muted-foreground",
													children: "Your identity is restricted to authorized committee members and is not disclosed to the reported person unless required by institutional process."
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: cn("flex items-start space-x-3 rounded-xl border p-3.5 transition-colors cursor-pointer", privacyPreference === "anonymous_to_reported" ? "border-primary bg-primary/5" : "border-border hover:bg-muted/30"),
											onClick: () => setPrivacyPreference("anonymous_to_reported"),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
												value: "anonymous_to_reported",
												id: "priv-anon",
												className: "mt-0.5"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-0.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "priv-anon",
													className: "text-xs font-bold cursor-pointer text-foreground",
													children: "Anonymous to Reported Person"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[0.72rem] text-muted-foreground",
													children: "Your identity is not shown to the person reported, subject to institutional policy and due-process requirements."
												})]
											})]
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3 pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs font-bold text-foreground",
									children: "How urgent is this issue?"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioGroup, {
									value: urgency,
									onValueChange: (v) => setUrgency(v),
									className: "grid grid-cols-1 sm:grid-cols-3 gap-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: cn("flex items-center space-x-2 rounded-lg border p-3 cursor-pointer", urgency === "normal" ? "border-primary bg-primary/5 font-semibold" : "border-border hover:bg-muted/30"),
											onClick: () => setUrgency("normal"),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
												value: "normal",
												id: "urg-normal"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "urg-normal",
												className: "text-xs cursor-pointer",
												children: "Normal"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: cn("flex items-center space-x-2 rounded-lg border p-3 cursor-pointer", urgency === "urgent" ? "border-amber-500 bg-amber-500/10 font-semibold" : "border-border hover:bg-muted/30"),
											onClick: () => setUrgency("urgent"),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
												value: "urgent",
												id: "urg-urgent"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "urg-urgent",
												className: "text-xs cursor-pointer text-amber-600 dark:text-amber-400",
												children: "Urgent"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: cn("flex items-center space-x-2 rounded-lg border p-3 cursor-pointer", urgency === "immediate_safety" ? "border-destructive bg-destructive/10 font-semibold" : "border-border hover:bg-muted/30"),
											onClick: () => setUrgency("immediate_safety"),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
												value: "immediate_safety",
												id: "urg-safety"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "urg-safety",
												className: "text-xs cursor-pointer text-destructive",
												children: "Immediate Safety Concern"
											})]
										})
									]
								})]
							}),
							urgency === "immediate_safety" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-destructive space-y-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-5 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-xs font-bold uppercase tracking-wider",
										children: "Emergency Warning: Immediate Danger"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-xs leading-relaxed",
										children: [
											"\"If you are in immediate danger, contact the college's emergency/security services immediately (",
											INSTITUTION.phone,
											" or ",
											INSTITUTION.antiRaggingPhone,
											"). Submitting this form should not be used as an emergency response channel.\""
										]
									})] })]
								})
							})
						]
					}),
					currentStep === 7 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-b border-border pb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-base font-bold text-foreground",
									children: "7. Review Complaint Before Submission"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Please double check all submitted details. You can edit any section before final transmission."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg border border-border p-4 bg-muted/20",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between mb-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs font-bold text-foreground",
												children: "Complainant Details"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												size: "sm",
												onClick: () => setCurrentStep(1),
												className: "h-6 text-[0.7rem] text-primary",
												children: "Edit"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-muted-foreground",
														children: "Name:"
													}),
													" ",
													studentProfile.name
												] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-muted-foreground",
														children: "Roll No:"
													}),
													" ",
													studentProfile.rollNumber
												] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-muted-foreground",
														children: "Dept:"
													}),
													" ",
													studentProfile.department
												] })
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg border border-border p-4 bg-muted/20",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between mb-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs font-bold text-foreground",
												children: "Incident Information"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												size: "sm",
												onClick: () => setCurrentStep(2),
												className: "h-6 text-[0.7rem] text-primary",
												children: "Edit"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-1.5 text-xs",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-muted-foreground",
														children: "Title:"
													}),
													" ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-semibold",
														children: title || "Untitled"
													})
												] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "grid grid-cols-1 sm:grid-cols-3 gap-2",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-muted-foreground",
																children: "Category:"
															}),
															" ",
															category
														] }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-muted-foreground",
																children: "Date:"
															}),
															" ",
															incidentDate,
															" ",
															incidentTime
														] }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-muted-foreground",
																children: "Location:"
															}),
															" ",
															location
														] })
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "pt-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-muted-foreground",
														children: "Description:"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mt-0.5 text-foreground bg-card p-2.5 rounded border border-border/60 whitespace-pre-wrap",
														children: description
													})]
												})
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg border border-border p-4 bg-muted/20",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between mb-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-xs font-bold text-foreground",
												children: [
													"Persons Reported (",
													persons.length,
													")"
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												size: "sm",
												onClick: () => setCurrentStep(3),
												className: "h-6 text-[0.7rem] text-primary",
												children: "Edit"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "space-y-2 text-xs",
											children: persons.map((p, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "bg-card p-2.5 rounded border border-border/60",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "font-semibold text-foreground",
														children: [
															p.unknownDetails ? "Unidentified Person" : p.name,
															" (",
															p.relationship,
															")"
														]
													}),
													p.rollNumber && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "text-muted-foreground text-[0.7rem]",
														children: [
															"Roll: ",
															p.rollNumber,
															" · ",
															p.department
														]
													}),
													p.details && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "text-muted-foreground text-[0.7rem] mt-0.5",
														children: ["Details: ", p.details]
													})
												]
											}, p.id))
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-lg border border-border p-4 bg-muted/20",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between mb-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs font-bold text-foreground",
													children: "Witnesses"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													variant: "ghost",
													size: "sm",
													onClick: () => setCurrentStep(4),
													className: "h-6 text-[0.7rem] text-primary",
													children: "Edit"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs text-muted-foreground",
												children: hasWitnesses === "yes" ? `${witnesses.length} witness(es) listed` : `Witness presence: ${hasWitnesses}`
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-lg border border-border p-4 bg-muted/20",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between mb-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs font-bold text-foreground",
													children: "Evidence Files"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													variant: "ghost",
													size: "sm",
													onClick: () => setCurrentStep(5),
													className: "h-6 text-[0.7rem] text-primary",
													children: "Edit"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs text-muted-foreground",
												children: evidenceList.length > 0 ? `${evidenceList.length} file(s) attached` : "No files attached"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg border border-border p-4 bg-muted/20",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between mb-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs font-bold text-foreground",
												children: "Privacy & Urgency"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												size: "sm",
												onClick: () => setCurrentStep(6),
												className: "h-6 text-[0.7rem] text-primary",
												children: "Edit"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-2 gap-2 text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground",
													children: "Confidentiality:"
												}),
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "capitalize font-semibold",
													children: privacyPreference.replace(/_/g, " ")
												})
											] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground",
													children: "Urgency:"
												}),
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "capitalize font-semibold",
													children: urgency.replace(/_/g, " ")
												})
											] })]
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-xl border border-primary/30 bg-primary/5 p-4 space-y-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start space-x-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
										id: "declarationConfirm",
										checked: confirmedAccuracy,
										onCheckedChange: (c) => setConfirmedAccuracy(!!c),
										className: "mt-0.5"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "declarationConfirm",
										className: "text-xs font-medium leading-relaxed text-foreground cursor-pointer",
										children: "\"I confirm that the information I have provided is accurate to the best of my knowledge.\""
									})]
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between pt-4 border-t border-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "outline",
							onClick: prevStep,
							disabled: currentStep === 1 || submitting,
							className: "text-xs gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" }), " Previous"]
						}), currentStep < 7 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							onClick: nextStep,
							className: "text-xs bg-primary hover:bg-primary/90 gap-1.5 font-semibold",
							children: ["Continue ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							onClick: handleSubmit,
							disabled: !confirmedAccuracy || submitting,
							className: "text-xs bg-primary hover:bg-primary/90 gap-2 font-semibold shadow-md px-6",
							children: [submitting ? "Submitting to Discipline Committee..." : "Submit Complaint", !submitting && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" })]
						})]
					})
				]
			})
		]
	});
}
//#endregion
export { NewComplaintRoute as component };

import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as useDsim, c as YEARS_OF_STUDY, n as Button, r as DEPARTMENTS, t as ACADEMIC_YEARS } from "./button-C7ZpzBGx.mjs";
import { x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as Save, Jt as ArrowLeft, Pt as CircleCheck, s as UserPlus } from "../_libs/lucide-react.mjs";
import { b as PersonCard, v as PageHeader, w as SecureTag } from "./UnauthorizedPage-B_V7V3Jx.mjs";
import { t as Protected } from "./Protected-DW_nWC7p.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Cd1zWcTd.mjs";
import { t as Input } from "./input-bGUSqmNl.mjs";
import { t as Label } from "./label-Di2QZFiw.mjs";
import { t as Textarea } from "./textarea-DmMEYLpm.mjs";
import { t as AddPersonModal } from "./AddPersonModal-CXLUEoDX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cases.new-7ugv2PPo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CreateCasePage() {
	const navigate = useNavigate();
	const { addCase, pushNotification } = useDsim();
	const [caseName, setCaseName] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [startDate, setStartDate] = (0, import_react.useState)((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
	const [startTime, setStartTime] = (0, import_react.useState)((/* @__PURE__ */ new Date()).toTimeString().slice(0, 5));
	const [studentName, setStudentName] = (0, import_react.useState)("");
	const [rollNumber, setRollNumber] = (0, import_react.useState)("");
	const [department, setDepartment] = (0, import_react.useState)(DEPARTMENTS[0] || "");
	const [academicYear, setAcademicYear] = (0, import_react.useState)(ACADEMIC_YEARS[0] || "");
	const [yearOfStudy, setYearOfStudy] = (0, import_react.useState)(YEARS_OF_STUDY[1] || "");
	const [involvedPersons, setInvolvedPersons] = (0, import_react.useState)([]);
	const [showAddPerson, setShowAddPerson] = (0, import_react.useState)(false);
	const [initialNotes, setInitialNotes] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const handleAddPerson = (p) => {
		const newPerson = {
			...p,
			id: Math.random().toString(36).slice(2, 9)
		};
		setInvolvedPersons((prev) => [...prev, newPerson]);
		toast.success(`Added ${p.name} to involved persons`);
	};
	const handleRemovePerson = (id) => {
		setInvolvedPersons((prev) => prev.filter((p) => p.id !== id));
	};
	const handleCreate = (asDraft = false) => {
		if (!caseName.trim() || !studentName.trim() || !rollNumber.trim()) {
			toast.error("Please fill in required fields (Case Name, Student Name, Roll Number)");
			return;
		}
		setSubmitting(true);
		setTimeout(() => {
			const investigationStart = startDate ? `${startDate}T${startTime}:00.000Z` : void 0;
			const created = addCase({
				caseName: caseName.trim(),
				description: description.trim() || "Initial investigation initiated.",
				accusedStudent: studentName.trim(),
				rollNumber: rollNumber.trim(),
				department: department || DEPARTMENTS[0] || "",
				academicYear: academicYear || ACADEMIC_YEARS[0] || "",
				yearOfStudy: yearOfStudy || YEARS_OF_STUDY[1] || "",
				involvedPersons,
				status: asDraft ? "Draft" : "Under Investigation",
				...investigationStart ? { investigationStart } : {},
				...initialNotes.trim() ? { notes: initialNotes.trim() } : {}
			});
			pushNotification({
				type: "investigation",
				message: `New case ${created.id} (${created.caseName}) was initiated.`,
				caseId: created.id
			});
			toast.success(`Case ${created.id} created successfully.`);
			navigate({
				to: "/cases/$caseId",
				params: { caseId: created.id }
			});
		}, 400);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Protected, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-4xl space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "ghost",
					size: "sm",
					onClick: () => navigate({ to: "/cases" }),
					className: "text-xs text-muted-foreground hover:text-foreground gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-3.5" }), " Back to Cases"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SecureTag, { children: "Confidential Case Intake" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "Case Intake Protocol",
				title: "Create New Disciplinary Case",
				subtitle: "Enter the initial details of the incident, accused student, and involved witnesses."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface p-6 space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 border-b border-border pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-6 place-items-center rounded-full bg-primary text-primary-foreground text-xs font-bold",
								children: "1"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold text-sm",
								children: "Case Information"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "c-name",
										className: "text-xs font-medium",
										children: "Case Title / Primary Allegation *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "c-name",
										placeholder: "E.g., Laboratory Equipment Damage, Exam Irregularity, Hostel Curfew Violation",
										value: caseName,
										onChange: (e) => setCaseName(e.target.value),
										className: "text-sm",
										required: true
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "c-desc",
										className: "text-xs font-medium",
										children: "Case Description & Incident Background *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
										id: "c-desc",
										placeholder: "Provide detailed context regarding when the incident occurred, location, initial reporting officer, and damage or infraction observed...",
										value: description,
										onChange: (e) => setDescription(e.target.value),
										rows: 3,
										className: "text-xs"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "c-date",
											className: "text-xs font-medium",
											children: "Investigation Start Date"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "c-date",
											type: "date",
											value: startDate,
											onChange: (e) => setStartDate(e.target.value),
											className: "text-xs font-mono"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "c-time",
											className: "text-xs font-medium",
											children: "Investigation Start Time"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "c-time",
											type: "time",
											value: startTime,
											onChange: (e) => setStartTime(e.target.value),
											className: "text-xs font-mono"
										})]
									})]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface p-6 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 border-b border-border pb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid size-6 place-items-center rounded-full bg-primary text-primary-foreground text-xs font-bold",
									children: "2"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-semibold text-sm",
									children: "Accused Student Particulars"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "s-name",
										className: "text-xs font-medium",
										children: "Student Full Name *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "s-name",
										placeholder: "E.g., Harish Kumar",
										value: studentName,
										onChange: (e) => setStudentName(e.target.value),
										className: "text-xs",
										required: true
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "s-roll",
										className: "text-xs font-medium",
										children: "Roll / Registration Number *"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "s-roll",
										placeholder: "E.g., 21CS047",
										value: rollNumber,
										onChange: (e) => setRollNumber(e.target.value),
										className: "text-xs font-mono",
										required: true
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-xs font-medium",
											children: "Department"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											value: department,
											onValueChange: setDepartment,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
												className: "text-xs",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: DEPARTMENTS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: d,
												className: "text-xs",
												children: d
											}, d)) })]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-xs font-medium",
											children: "Academic Year"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											value: academicYear,
											onValueChange: setAcademicYear,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
												className: "text-xs",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: ACADEMIC_YEARS.map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: y,
												className: "text-xs",
												children: y
											}, y)) })]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-xs font-medium",
											children: "Year of Study"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											value: yearOfStudy,
											onValueChange: setYearOfStudy,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
												className: "text-xs",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: YEARS_OF_STUDY.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: s,
												className: "text-xs",
												children: s
											}, s)) })]
										})]
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface p-6 space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-border pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid size-6 place-items-center rounded-full bg-primary text-primary-foreground text-xs font-bold",
									children: "3"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-semibold text-sm",
									children: "Additional Persons Involved"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[0.7rem] text-muted-foreground",
									children: "Witnesses, reporting staff, and accomplices"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "outline",
								size: "sm",
								onClick: () => setShowAddPerson(true),
								className: "gap-1.5 text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "size-3.5" }), " + Add Person"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 sm:grid-cols-2",
							children: [studentName ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonCard, {
								main: true,
								person: {
									id: "accused-main",
									name: studentName,
									role: `${yearOfStudy} Student`,
									department: department || DEPARTMENTS[0] || "",
									rollNumber: rollNumber || "Pending Roll #"
								}
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center justify-center rounded-xl border border-dashed border-border p-4 text-xs text-muted-foreground",
								children: "Fill in section 2 to preview main accused"
							}), involvedPersons.map((person) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonCard, {
								person,
								onRemove: () => handleRemovePerson(person.id)
							}, person.id))]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface p-6 space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 border-b border-border pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-6 place-items-center rounded-full bg-primary text-primary-foreground text-xs font-bold",
								children: "4"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold text-sm",
								children: "Initial Investigation Notes"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "c-notes",
								className: "text-xs font-medium",
								children: "Preliminary Findings & Intake Observations"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "c-notes",
								placeholder: "Record any immediate instructions given to the student, confiscated materials, or initial committee remarks...",
								value: initialNotes,
								onChange: (e) => setInitialNotes(e.target.value),
								rows: 4,
								className: "text-xs"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							onClick: () => navigate({ to: "/cases" }),
							className: "w-full sm:w-auto text-xs",
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2.5 w-full sm:w-auto",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "outline",
								disabled: submitting,
								onClick: () => handleCreate(true),
								className: "flex-1 sm:flex-initial text-xs gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-3.5" }), " Save Draft"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								disabled: submitting,
								onClick: () => handleCreate(false),
								className: "flex-1 sm:flex-initial text-xs gap-1.5 bg-primary hover:bg-primary/90",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5" }), " Create Case & Begin Investigation"]
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddPersonModal, {
				open: showAddPerson,
				onOpenChange: setShowAddPerson,
				onAdd: handleAddPerson
			})
		]
	}) });
}
//#endregion
export { CreateCasePage as component };

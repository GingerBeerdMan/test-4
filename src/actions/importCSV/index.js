export const ImportCsvTypes = {
	IMPORT_CSV: 'IMPORT_CSV',
	IMPORT_CSV_SUCCEEDED: 'IMPORT_CSV_SUCCEEDED',
	IMPORT_CSV_FAILED: 'IMPORT_CSV_FAILED',
};

export const importCsv = (data) => ({
	type: ImportCsvTypes.IMPORT_CSV,
	payload: data
});

export const importCsvSucceeded = (data) => ({
	type: ImportCsvTypes.IMPORT_CSV_SUCCEEDED,
	payload: data
});

export const importCsvFailed = () => ({
	type: ImportCsvTypes.IMPORT_CSV_FAILED,
});

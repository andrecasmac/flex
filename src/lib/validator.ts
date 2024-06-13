const el_delim = '*';
const sg_delim = '~';

// ------------------- PARSING FUNCTIONS -----------------------

// gets current character in source stream (with the current logic this is
// just the first character)
function current_char(source: string): string {
	return source[0];
}


// advances source stream by one char
function advance(source: string): string {
	return source.substring(1);
}


// skips all newlines and carriages returns in source stream to 
// allow for newlines when testing or for prettier formatting
function skip_newlines(source: string): string {
	while (current_char(source) === '\n' || current_char(source) === '\r') {
		source = advance(source);
	}

	return source;
}


// gets the next token to process in the EDI input file
// which is going to be an element inside the corresponding
// segment
function next_token(source: string, segment_index: number): any[] {
	let token = '';
	while (current_char(source) != el_delim && current_char(source) != sg_delim) {

		if (current_char(source) == '\n' || current_char(source) == '\r' || source.length == 0) {
			let error = `missing segment delimeter '${sg_delim}' at segment ${segment_index}`;
			source = skip_newlines(source);
			return [token, source, true, error];
		}

		token +=  current_char(source);
		source = advance(source);
	}

	// consume ** separator
	if (current_char(source) == el_delim) {
		return [token, advance(source)];
	} else {
		return [token, source];
	}
}


// get all tokens/elements of a segment and return them in an array
// (the segment name counts as the first "element" and will be at the
// beginning of the array)
function parse_segment(source: string, segment_index: number): [string[], string, string[]] {
	let tokens: string[] = [];
	let errors: string[] = [];
	let should_break = false;
	while (current_char(source) != sg_delim && source.length != 0 && !should_break) {
		let token: string;
		let error: string;

		[token, source, should_break, error] = next_token(source, segment_index);
		tokens.push(token);

		if (error) {
			errors.push(error);
		}
	}

	// this is:
	if (current_char(source) == sg_delim) {
		source = advance(source);
	}

	return [tokens, source, errors];
}


// parses EDI input file. It returns an array containing
// each segment's tokens with the structure:
// [ [segment_name, segment element tokens...],
//   [segment_name, segment element tokens...],
//   ...
//   [segment_name, segment element tokens...],
// ]
export function parse_edi(source: string) {
	let edi_object: string[][] = [];
	let parse_errors: string[] = [];

	let segment_index = 1;
	while (source.length !== 0) {
		let segment_tokens: string[];
		let segment_parse_errors: string[];

		[segment_tokens, source, segment_parse_errors] = parse_segment(source, segment_index);

		edi_object.push(segment_tokens);

		segment_parse_errors.forEach((error) => {
			parse_errors.push(error);
		})

		source = skip_newlines(source);

		segment_index += 1;
	}

	return [edi_object, parse_errors];
}


// ------------------- MISC FUNCTIONS -----------------------

// all these helper functions are for accessing the segment
// structure so that if the format changes these are the only
// places that have to be modified

// gets name of segment in the structure returned by parse_edi()
function get_segment_name(segment: string[]) {

	if (!segment) {
		return null;
	}

	return segment[0];
}

// gets the name of the segment declared in the EDI schema
// at the passed index
function get_edi_segment_name(schema: any, index: number) {

	if (!schema[index]) {
		return null;
	}

	return schema[index].name;
}


// gets the schema of the segment (the schema that determines the 
// structure of the segment, which elements belong it, etc.)
function get_segment_schema(schema: any, index: number) {
	return schema[index].rules;
}


// gets whether the segment is mandatory in the EDI file or not
function get_segment_mandatory(schema: any, index: number) {
	return schema[index].mandatory;
}


// gets max amount of appearances a segment can have in a row 
function get_segment_max(schema: any, index: number) {
	return schema[index].max;
}


// ------------------- VALIDATING FUNCTIONS -----------------------

// all the following is_x functions validate whether an element is of type 
// x, using the EDI x12 standard

function is_special(char: string): boolean {
	if (char != ' '  && char != '"'  &&
		char != '&'  && char != '\'' &&
		char != '('  && char != ')'  &&
		char != '*'  && char != '+'  &&
		char != ','  && char != '-'  &&
		char != '-'  && char != '.'  &&
		char != '/'  && char != ';'  &&
		char != ':'  && char != '?'  &&
		char != '='  && char != '%'  &&
		char != '~'  && char != '@'  &&
		char != '['  && char != ']'  &&
		char != '_'  && char != '{'  &&
		char != '\\' && char != '|'  &&
		char != '<'  && char != '>'  &&
		char != '#'  && char != '$')  {
			return false;
	}

	return true;
}


function is_alphanumeric(string: string): boolean {
	let i = 0;
	while (i < string.length) {
		let char = string.charAt(i);

		if (!(char >= 'a' && char <= 'z') &&
			!(char >= 'A' && char <= 'Z') &&
			!(char >= '0' && char <= '9') &&
			!is_special(char)) {
			return false;
		}

		i++;
	}

	return true;
}


function is_date(string: string): boolean {
	switch (string.length) {
		case 8: {
			let century = Number(string.slice(0, 2));
			let year	= Number(string.slice(2, 4));
			let month	= Number(string.slice(4, 6));
			let day		= Number(string.slice(6, 8));

			if (isNaN(century) || isNaN(year) || isNaN(month) || isNaN(day)) {
				return false;
			} else if (!(year >= 0 && year <= 99)) {
				return false;
			} else if (!(month >= 1 && month <= 12)) {
				return false;
			} else if (!(day >= 1 && day <= 31)) {
				return false;
			}

			return true;
		}

		case 6: {
			let year	= Number(string.slice(0, 2));
			let month	= Number(string.slice(2, 4));
			let day		= Number(string.slice(4, 6));

			if (isNaN(year) || isNaN(month) || isNaN(day)) {
				return false;
			} else if (!(year >= 0 && year <= 99)) {
				return false;
			} else if (!(month >= 1 && month <= 12)) {
				return false;
			} else if (!(day >= 1 && day <= 31)) {
				return false;
			}

			return true;
		}

		default:
			return false;
	}
}


function is_time(string: string): boolean {

	if (string.length < 4) {
		return false;
	}

	let hours	= Number(string.slice(0, 2));
	let minutes	= Number(string.slice(2, 4));

	if (isNaN(hours) || isNaN(minutes)) {
		return false;
	} else if (!(hours >= 0 && hours <= 23)) {
		return false;
	} else if (!(minutes >= 0 && minutes <= 59)) {
		return false;
	}


	switch (string.length) {
		case 4:
			return true;

		case 6: {
			let i_seconds = Number(string.slice(4, 6));

			if (isNaN(i_seconds)) {
				return false;
			} else if (!(i_seconds >= 0 && hours <= 59)) {
				return false;
			}

			return true;
		}

		case 7: {
			let i_seconds = Number(string.slice(4, 6));
			let t_seconds = Number(string.slice(6, 7));

			if (isNaN(i_seconds) || isNaN(t_seconds)) {
				return false;
			} else if (!(i_seconds >= 0 && i_seconds <= 59)) {
				return false;
			} else if (!(t_seconds >= 0 && t_seconds <= 9)) {
				return false;
			}

			return true;
		}

		case 8: {
			let i_seconds = Number(string.slice(4, 6));
			let h_seconds = Number(string.slice(6, 8));

			if (isNaN(i_seconds) || isNaN(h_seconds)) {
				return false;
			} else if (!(i_seconds >= 0 && i_seconds <= 59)) {
				return false;
			} else if (!(h_seconds >= 0 && h_seconds <= 99)) {
				return false;
			}

			return true;
		}
	}

	return false;
}

function is_numeric(string: string, type: any): boolean {
	let number = Number(string);

	if (isNaN(number)) return false;

	if (type == 0) {
		if (string.includes(".")) {
			return false;
		} else {
			return true;
		}
	}

	if (type == null) {
		if (string.includes(".")) {
			let fractional_part = string.split(".")[1];

			// check if there's trailing zeros
			if (fractional_part[fractional_part.length - 1] != '0')
				return true;
			else
				return false;

		}  else {
			return true;
		}
	}

	// check that decimal places doesn't exceed the limit
	// specified by the type
	if (string.includes(".")) {
		let fractional_part = string.split(".")[1];

		if (fractional_part.length <= type)
			return true;
		else 
			return false;
	} 


	return true;
}


// checks whether element is equal to one of the values specified in the oneOf field 
// of the schema for that element
function validate_one_of(element_schema: any, string: string): boolean {
	if (!("oneOf" in element_schema)) {
		return false;
	}

	return element_schema.oneOf.some((code: string) => code == string);
}


// if element is mandatory and there is no element return false, otherwise 
// return true
function validate_mandatory(element_schema: any, string: string): boolean {
	if (element_schema.mandatory) {
		return string.length != 0;
	}

	return true;
}


// checks that element length is within bounds specified in element schema
function validate_length(element_schema: any, string: string): boolean {
	return	(!element_schema.mandatory && string.length === 0) ||
			(string.length >= element_schema.min && 
			 string.length <= element_schema.max);
}


// helper function to call type validator of the correct type
function validate_type(element_schema: any, string: string): boolean {
	switch (element_schema.type) {
		case "ID":
			return validate_one_of(element_schema, string);
		case "AN":
			return is_alphanumeric(string);
		case "DT":
			return is_date(string);
		case "TM":
			return is_time(string);
		case "N":
		case "N0":
		case "N1":
		case "N2":
		case "N3":
		case "N4":
		case "N5":
		case "N6":
			return is_numeric(string, 0);
		case "R":
			return is_numeric(string, null);
		case "R0":
		case "R1":
		case "R2":
		case "R3":
		case "R4":
		case "R5":
		case "R6":
			return is_numeric(string, Number(element_schema.type[1]));
		case "SE":
			return true;
		default:
			return false;
	}
}


function validate_equality(element_schema: any, element: string): boolean {
	if (element != element_schema.isEqualTo) {
		return false;
	}

	return true;
}


// validates an individual element by a series of calls to each validator function,
// if one fails the function throws an error since element is wrong
function validate_element(element_schema: any, element: string, index: number) {
	if (!validate_mandatory(element_schema, element)) {
		throw new Error(`element ${index} mandatory`); 
	}

	if (!validate_length(element_schema, element)) {
		throw new Error(`bad length at element ${index} '${element}'`); 
	}

	if (!validate_type(element_schema, element)) {
		if (element_schema.type == "ID") {
			if ("oneOf" in element_schema) {
				throw new Error(`bad type at ${index} '${element}': value should be one of ${element_schema.oneOf}`); 
			} else {
				throw new Error(`bad type at ${index} '${element}'`); 
			}
		} else if (element_schema.type == "DT") {
			switch (element.length) {
				case 6:
					throw new Error(`bad type at ${index} '${element}': value should be date in format YYMMDD`); 
				case 8:
					throw new Error(`bad type at ${index} '${element}': value should be date in format CCYYMMDD`); 
			}

		} else if (element_schema.type == "TM") {
			switch (element.length) {
				case 4:
					throw new Error(`bad type at ${index} '${element}': value should be time in format HHMM`); 
				case 6:
					throw new Error(`bad type at ${index} '${element}': value should be time in format HHMMSS`); 
				case 7:
					throw new Error(`bad type at ${index} '${element}': value should be time in format HHMMSSD`); 
				case 8:
					throw new Error(`bad type at ${index} '${element}': value should be time in format HHMMSSDD`); 
			}
		}

		throw new Error(`bad type at ${index} '${element}': type should be ${element_schema.type}`); 
	}

	if ("isEqualTo" in element_schema) {
		if (!validate_equality(element_schema, element)) {
			throw new Error(`bad value at ${index} '${element}': value should be equal to ${element_schema.isEqualTo}`); 
		}
	}

}


// goes through all elements in segment and validates each, also checks that the segment
// has the correct amount of elements
function validate_segment(segment_schema: any, segment: string[], segment_index: number) {
	let errors: string[] = []

	let element_index: number;
	for (element_index = 1; element_index < segment.length; element_index++) {
		let element = segment[element_index];
		let element_schema = segment_schema[element_index];

		if (element_schema == undefined) {
			errors.push(`error at segment #${segment_index} ${get_segment_name(segment)}: unexpected element '${element}' at position ${element_index}`);
			continue;
		}

		try {
			validate_element(element_schema, element, element_index)
		} catch (e: any) {
			errors.push(`error at segment #${segment_index} ${get_segment_name(segment)}: ${e.message}`);
		}
	}

	while (element_index <= (Object.keys(segment_schema).length - 1)) {

		if (segment_schema[element_index].mandatory) {
			errors.push(`error at segment #${segment_index} ${get_segment_name(segment)}: missing element at index ${element_index}`);
		}

		element_index += 1;
	}

	return errors;
}

// this functions is what does the actual validation of the EDI after the input has been parsed
// and its structure has been mapped to the schema. It calls validate_segment for each segment in the
// EDI file and returns all errors in an array
export function validate_segments(structure: any, edi_schema: any) {
	let segment_errors: string[] = []

	structure.forEach((struct: any, struct_index: number) => {
		let segment_schema = edi_schema;

		let i: number;
		for (i = 0; i < struct.length - 1; i++) {
			segment_schema = get_segment_schema(segment_schema, struct[i])
		}

		let e = validate_segment(segment_schema, struct[i], struct_index + 1);

		e.forEach((error) => {
			segment_errors.push(error);
		});

	});

	return segment_errors;
}


// parsed_edi contains each segment's tokens
// edi schema contains edi structure which defines
// a grammar so we can just use regular recursive descent
// like techniques for parsing the input structure
export function parse_input_structure(parsed_edi: any, schema: any, segment_index: any = 0, in_loop = false) {
	let edi_segment_index = 0;
	let errors: any[] = [];

	 // will contain all segment 'tokens' in appropiate position for later validation
	let structure: any[] = [];

	// get number of segments in input
	let input_n_segments = parsed_edi.length;

	// get number of 'non-terminals' in edi schema
	let edi_n_segments = schema.length;

	// segment 'token'. We interpret the segment names as the tokens
	// in this new grammar
	let current_token: any;
	let expected_token: any;
	let segment: any;

	while (edi_segment_index < edi_n_segments) {
		segment = parsed_edi[segment_index];
		current_token	= get_segment_name(segment);
		expected_token	= get_edi_segment_name(schema, edi_segment_index);

		// handle loops
		if (expected_token == "LOOP") {
			let loop_schema = get_segment_schema(schema, edi_segment_index);
			let loop_max = get_segment_max(schema, edi_segment_index);
			let loop_current = 1;

			let [l_structure, 
				l_segment_i, 
				l_continue] = parse_input_structure(
									parsed_edi, 
									loop_schema, 
									segment_index, 
									true);

			while (l_continue) {
				// for each segment structure the loop returns (so the loop ran completely and successfully)
				// we put the index of the loop structure in the EDI schema at the beginning of it and append that 
				// to our overall structure array to keep track of the path for later validation
				//
				// if the loop returns l_continue == false it means the loop encountered an error which right now
				// we just interpret to mean that we should have exited out of loop so we ignore its l_structure
				// and l_segment_i (loop segment index) to recheck the segments that caused an error in the loop
				// since they might not have belonged to it

				segment_index = l_segment_i;

				l_structure.forEach((struct: any) => {
					struct.unshift(edi_segment_index);
					structure.push(struct);
				});

				// // if all segments got eaten up exit out of loop
				// if (segment_index >= input_n_segments) {
				// 	break;
				// }

				[l_structure, l_segment_i, l_continue] = parse_input_structure(
															parsed_edi, 
															loop_schema, 
															segment_index, 
															true);

				// increment iteration count
				loop_current += 1;

				// break out of loop if we reach the max amount
				// of iterations
				if (loop_max && loop_current > loop_max) {
					l_continue = false;
				}
			}

			// go to next segment immediately
			edi_segment_index += 1;
			continue;
		}

		let mandatory = get_segment_mandatory(schema, edi_segment_index);
		let max = get_segment_max(schema, edi_segment_index);
		
		for (let count = 0; count < max; count++) {
			mandatory = (mandatory && count == 0) ? true: false;

			if (current_token == expected_token) {
				structure.push([edi_segment_index, segment]);
				segment_index += 1;
			}

			else if (!mandatory) {
				break;
			}

			else {
				if (!in_loop) {
					errors.push(`unexpected segment #${segment_index + 1} '${current_token}' expected ${expected_token}`);
					segment_index += 1;
				} else {
					return [null, null, false];
				}
			}

			if (segment_index >= input_n_segments) {
				// we ran out of tokens (segments in input)
				// add missing segments (if any) to error logs
				//
				// if in loop and missing segments exist abort!
				if (in_loop) {
					if (edi_segment_index + 1 < edi_n_segments) {
						return [null, null, false];
					} else {
						return [structure, segment_index, true];
					}
				}
				
				for (edi_segment_index += 1; edi_segment_index < edi_n_segments; edi_segment_index++) {
					if (get_segment_mandatory(schema, edi_segment_index)) {
						errors.push(`missing segment #${segment_index} '${get_edi_segment_name(schema, edi_segment_index)}'`);
					}
				}

				return [structure, errors];
			}

			segment = parsed_edi[segment_index];
			current_token = get_segment_name(segment);
		}

		edi_segment_index += 1;
	}

	// if in loop we ignore extra inputs for obvious reasons
	if (!in_loop) {
		// log errors of extra input segments that were left
		for (segment_index; segment_index < input_n_segments; segment_index++) {
			errors.push(`unexpected segment #${segment_index + 1} '${get_segment_name(parsed_edi[segment_index])}'`);
		}
	}

	if (in_loop) {
		// if loop reached this point everything went ok without errors in loop
		// so we return the structure, the segment index so parent function can 
		// update it accordingly and true flag to continue looping

		return [structure, segment_index, true];
	} else {
		return [structure, errors];
	}
}

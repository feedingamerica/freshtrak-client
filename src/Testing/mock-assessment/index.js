import { build, fake } from 'test-data-bot';

const mockAssessmentQuestionsContent = build('Assessment Questions').fields({
  assessment_name : fake(f => f.name.title()),
  assessment_id : fake(f => f.random.number()),
  is_assessment_active : true,
  question : fake(f => f.name.title()),
  question_id : fake(f => f.name.title()),
  description : fake(f => f.name.title()),
  //id : fake(f => f.random.number({ min: 1, max: 13})),
  user_id : fake(f => f.random.uuid()),
  option : fake(f => f.random.words(5)),
  is_qn_active : true,
  assment_qn_id : fake(f => f.random.number()),
  option_start_value : fake(f => f.random.number()),
  option_end_value : fake(f => f.random.number()),
  is_money : fake(f => f.random.boolean()),
  step : 100,
  question_type : fake(f => f.random.arrayElement(["Radio Button","Check Box","Select Box","Enter Value"])),
  question_order : fake(f => f.random.number()),
  go_to_page : fake(f => f.random.number()),


});



const mockRangeQuestionContent = build('Range Question').fields({
  question : "dummy range question",
  description : fake(f => f.name.title()),
  id : 3,
  option_start_value : fake(f => f.random.number()),
  option_end_value : fake(f => f.random.number()),
  is_money : true,
  step : 100,
});

const mockCheckboxComponentContent = build('Checkbox Component').fields({
  question : fake(f => f.name.title()),
  description : fake(f => f.name.title()),
  id : 5,
  option : ["check hai","check hello","check how are you"],
});

const mockSelectQstnComponentContent = build('Checkbox Component').fields({
  question : fake(f => f.name.title()),
  description : fake(f => f.name.title()),
  id : 6,
  option : ["select hai","select hello","select how are you"],
});

const mockYesOrNoQstnComponentContent = build('Checkbox Component').fields({
  //question : fake(f => f.name.title()),
  question : "check for yes or no text",
  id : 6,
  go_to_page : fake(f => f.random.number()),
});

const mockWellnessComponentContext = build('Wellness Context').fields({
  assessment_id : fake(f => f.random.number()),
  total_questions : fake(f => f.random.number()),
	beginAssessmentData :mockAssessmentQuestionsContent,
	question_source_id : fake(f => f.random.number()),
	start_time: fake(f => f.random.number()),
	assessmentTitle : fake(f => f.name.title()),
	previous_page : fake(f => f.random.arrayElement([2,5,3,6])),
	next_page : fake(f => f.random.arrayElement([2,5,3,6])),
	answers : fake(f => f.random.arrayElement(["lorem","ipsum"])),
	isSkipped : fake(f => f.random.arrayElement([true,false,true,false])),
	option_id : fake(f => f.random.arrayElement([2,5,3,6])),
  go_to_page : fake(f => f.random.arrayElement([2,5,3,6])),
});

// const mockFoodBankBuilder = build('Food Bank').fields({
//   address: fake(f => f.address.streetAddress()),
//   city: fake(f => f.address.city()),
//   state: fake(f => f.address.state()),
//   zip: fake(f => f.address.zipCode()),
//   name: fake(f => f.random.word()),
//   nickname: fake(f => f.random.word()),
//   display_url: fake(f => f.internet.url()),
//   fb_agency_locator_url: fake(f => f.internet.url()),
//   fb_url: fake(f => f.internet.url()),
//   fb_fano_url: fake(f => f.internet.url()),
//   foodbank_texts: [mockFoodbankTextBuilder()],
// });

export const mockRangeQuestion = mockRangeQuestionContent();
export const mockCheckboxComponent = mockCheckboxComponentContent();
export const mockSelectQstnComponent = mockSelectQstnComponentContent();
export const mockYesOrNoQstnComponent = mockYesOrNoQstnComponentContent();
export const mockAssessmentQuestions = mockAssessmentQuestionsContent();
export const mockWellnessContext = mockWellnessComponentContext();
//export const mockFoodbankText = mockFoodbankTextBuilder();

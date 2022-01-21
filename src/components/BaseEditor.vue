<template>
	<span>
		<vue-editor
			:class="{'is-invalid': error, 'is-valid': valid }"
			:editor-toolbar="toolbar"
			:placeholder="placeholder"
			:value="value"
			use-custom-image-handler
			@input="$emit('update:value',$event)"
		/>
		<span v-if="error" class="small text-danger">{{ error }}</span>
	</span>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
// @ts-ignore
import { VueEditor } from 'vue2-editor'

const customToolBar = [
	[{ header: [2, 3, 4, 5, false] }],
	['bold', 'italic', 'underline', 'strike'],
	[{ script: 'sub' }, { script: 'super' }, 'formula'],
	['code-block'],
	['clean']
]

export default defineComponent({
	name: 'BaseEditor',
	components: { 'vue-editor': VueEditor },
	props: {
		value: {
			required: true,
			type: String
		},
		toolbar: {
			required: false,
			type: Array,
			default: () => customToolBar
		},
		placeholder: {
			required: true,
			type: String
		},
		error: {
			required: true,
			type: String
		},
		valid: {
			required: true,
			type: Boolean
		}
	}
})
</script>

<style>
    .quillWrapper {
        background: #ffffff;
        box-sizing: border-box;
        position: relative;
        display: flex;
        flex-direction: column;
        font-family: inherit !important;
    }

    .ql-toolbar {
        display: flex; /* flex; */
        flex-wrap: nowrap;
        overflow-x: auto;
        overflow-y: hidden;
        font-family: inherit !important;
        padding: 4px 0 !important;
    }

    .ql-formats {
        display: flex;
        padding: 8px;
        margin: 0 !important;
    }

    .ql-expanded {
        position: static;
    }

    .ql-picker-options {
        min-width: 0;
        top: 0;
        left: 0;
        position: absolute;
    }

    .ql-formats + .ql-formats {
        border-left: 1px solid #fafafa;
    }

    .ql-toolbar.ql-snow {
        border: 1px solid #aaaaaa !important;
    }

    .ql-container.ql-snow {
        border: 0 !important;
    }

    .ql-editor {
        background: #ffffff;
        border: 1px solid #aaaaaa;
        transition: border-color 0.1s ease-in-out, box-shadow 0.1s ease-in-out;
    }

    .ql-container {
        font-family: inherit !important;
    }

    .ql-editor:focus {
        outline: 0;
        border-radius: 6px;
        border: 1px solid #86b7fe;
        box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
    }

    .is-valid .ql-editor:focus {
        border: 1px solid #42b983;
        box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.25);
    }

    .is-invalid .ql-editor:focus {
        border: 1px solid #fa2121;
        box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);
    }

    .ql-editor.ql-blank::before {
        color: inherit;
        opacity: 0.5;
        font-size: 1em;
    }
</style>

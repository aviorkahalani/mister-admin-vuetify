<template>
    <section class="leads" v-if="leads">
        <v-card>
            <v-card-title>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table
                v-if="!leads"
                item-key="name"
                class="elevation-1"
                loading
                loading-text="Loading... Please wait"
            ></v-data-table>

            <v-data-table v-else :headers="headers" :items="leads" :search="search">
                <template slot="item.inboundDate" slot-scope="{ item }">
                    {{ currentDateTime(item.inboundDate) }}
                </template>
                <!-- CHECKBOX FIELD -->
                <template slot="item.wasCalled" slot-scope="{ item }">
                    <v-checkbox @click.native="saveChange" v-model="item.wasCalled"></v-checkbox>
                </template>

                <!-- EMPLOYEES FIELD -->
                <template v-slot:[`item.caller`]="{ item }">
                    <v-select
                        v-model="item.caller"
                        @change="saveChange"
                        :items="item.employees"
                    ></v-select>
                </template>
            </v-data-table>
        </v-card>
    </section>
</template>

<script>
import { leadService } from '../services/lead-service.js';
import moment from 'moment';

export default {
    name: 'leads',
    data() {
        return {
            expanded: [],
            singleExpand: false,
            search: '',
            headers: [
                {
                    text: 'Incoming Date',
                    align: 'start',
                    filterable: false,
                    value: 'inboundDate',
                },
                {
                    text: 'First Name',
                    align: 'start',
                    filterable: true,
                    value: 'fname',
                },
                {
                    text: 'Last Name',
                    align: 'start',
                    filterable: true,
                    value: 'lname',
                },
                {
                    text: 'Email',
                    align: 'start',
                    filterable: false,
                    value: 'email',
                },
                {
                    text: 'Phone',
                    align: 'start',
                    filterable: true,
                    value: 'phone',
                },
                {
                    text: 'Message',
                    align: 'start',
                    filterable: false,
                    value: 'words',
                },
                {
                    text: 'Lead Source',
                    align: 'start',
                    filterable: true,
                    value: 'leadSrc',
                },
                {
                    text: 'Was Called',
                    align: 'start',
                    filterable: false,
                    value: 'wasCalled',
                },
                {
                    text: 'Caller',
                    align: 'start',
                    filterable: false,
                    value: 'caller',
                },
            ],
            leads: null,
        };
    },

    created() {
        this.loadLeads();
    },

    methods: {
        async loadLeads() {
            this.leads = await leadService.query();
        },
        saveChange() {
            console.log('SAVING');
            leadService.save(this.leads);
            this.loadLeads();
        },
        saveChangeTo() {
            console.log('SAVEEE');
        },
        currentDateTime() {
            return moment().format('L');
        },
    },
};
</script>

<style></style>

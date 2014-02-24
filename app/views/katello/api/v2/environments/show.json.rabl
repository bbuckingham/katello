object @environment => :environment

extends 'katello/api/v2/common/identifier'
extends 'katello/api/v2/common/org_reference'

attributes :prior_id, :library
node(:prior) { |e| e.prior.try(:name) }
node(:prior_id) { |e| e.prior.try(:id) }
extends 'katello/api/v2/common/timestamps'
